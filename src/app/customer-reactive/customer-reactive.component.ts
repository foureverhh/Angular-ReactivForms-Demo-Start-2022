import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Customer } from '../model/Customer';

// reuseable customized validator
// AbstractControll the bas class for 
/*
function ratingRange(c: AbstractControl): {[key: string]: boolean} | null{
  if(c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { 'range': true };
  }
  return null;
}
*/
// Factory function
/*
function myValidator(param: any): ValidatorFn {
  return (c:AbstractControl): {[key: string]: boolean} | null => {
    if(somethingIsWrong) {
      return {'myValidator': true}
    }
    return null;
  }
}
*/

function ratingRange(min: number, max:number): ValidatorFn {
  return (c:AbstractControl): {[key: string]: boolean} | null => {
    if(c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return {'range': true}
    }
    return null;
  }
}
/*
//Cross-field validation: custom Validator
function dataCompare(c: AbstractControl): { [key: string]: boolean} | null {
  let startControl = c.get('start');
  let endControll = c.get('end');
  if(startControl?.value !== endControll?.value) {
    return {'match': true};
  }
  return null;
}
*/
function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmEmailControl = c.get('confirmEmail');
  if(emailControl?.pristine || confirmEmailControl?.pristine)
    return null;
  if(emailControl?.value === confirmEmailControl?.value) {
    return null;
  }
  return {'match': true};
}

@Component({
  selector: 'app-customer-reactive',
  templateUrl: './customer-reactive.component.html',
  styleUrls: ['./customer-reactive.component.css']
})
export class CustomerReactiveComponent implements OnInit {

customerForm: FormGroup;
customer: Customer = new Customer(); //model for backend
emailMessage: any;

private validationMessages = {
  required : 'Please enter your email address.',
  email: 'Please enter a valid email address.'
};
constructor(private formBuilder: FormBuilder) {
  this.customerForm = new FormGroup({});
}
ngOnInit(): void {
  //define customerForm in the formBuilder way
  this.customerForm = this.formBuilder.group({
    firstName: ['',[Validators.required, Validators.minLength(3)]],
    lastName:  ['', [Validators.required, Validators.maxLength(50)]],// can pass object as well {value:'n/a', disabled: true},
    emailGroup: this.formBuilder.group({
      email:     ['', [Validators.required, Validators.email]],
      confirmEmail: ['', Validators.required],
    } ,{validator: emailMatcher}), // call the validator for emailMatcher
    phone: '',
    notification: 'email',
    //rating: [null, ratingRange],
    rating: [null, ratingRange(1,5)],
    sendCatalog:true,
    // adresses: this.buildAdress()
    addresses: this.formBuilder.array([this.buildAddress()])
  });

  //define customerForm in wordy way
  /*
  this.customerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    sendCatalog: new FormControl(true), //with default value true
  });
  */

  this.customerForm.get('notification')?.valueChanges.subscribe(value => {
    this.setNotification(value);
  })

  const emailControl = this.customerForm.get('emailGroup.email');
  emailControl?.valueChanges.pipe(debounceTime(1000)).subscribe(value => this.setMessage(emailControl));
}

buildAddress(): FormGroup {
  return this.formBuilder.group({
    addressType:'home',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: ''
  });
} 

get addresses(): FormArray {
  return <FormArray> this.customerForm.get('addresses');
}

addAddress(): void {
  this.addresses.push(this.buildAddress());
}

setMessage(c: AbstractControl): void {
  this.emailMessage = '';
  if ((c.touched || c.dirty) && c.errors) {
    console.log('keys', Object.keys(c.errors))
    this.emailMessage = Object.keys(c.errors)
      .map( 
        key => {
          console.log('key', key)
          return this.validationMessages[key as keyof typeof this.validationMessages];
        }
      )
      .join(' '); 
  }
  console.log('emailMessage', this.emailMessage)
}
populateTestDataSetValue() {
  //setValue to set value for all properties
  this.customerForm.setValue({
    firstName:'Jack',
    lastName:'Harkness',
    email:'jack@torchwood.com',
    sendCatalog: false
  })
}

populateTestDataPatchValue() {
  //pathchValue to set value for subset properties
  this.customerForm.patchValue({
    firstName:'Jack',
    lastName:'Harkness',
    sendCatalog: false
  })
}

save(): void {
  console.log(this.customerForm);
  console.log('Saved: ' + JSON.stringify(this.customerForm.value));
}

// dynamic change validation on one formControl
setNotification(notifyVia: String): void {
  const phoneControl = this.customerForm.get('phone');
  if(notifyVia === 'text') {
    phoneControl?.setValidators(Validators.required);
  }else{
    phoneControl?.clearValidators;
  }
  phoneControl?.updateValueAndValidity();
}
}
