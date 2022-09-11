import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn  } from '@angular/forms';
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

//Cross-field validation: custom Validator
function dataCompare(c: AbstractControl): { [key: string]: boolean} | null {
  let startControl = c.get('start');
  let endControll = c.get('end');
  if(startControl?.value !== endControll?.value) {
    return {'match': true};
  }
  return null;
}

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
    } 
    ,{validator: emailMatcher}), // call the validator for emailMatcher
    phone: '',
    notification: 'email',
    //rating: [null, ratingRange],
    rating: [null, ratingRange(1,5)],
    sendCategory:true
  })

  //define customerForm in wordy way
  /*
  this.customerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    sendCategory: new FormControl(true), //with default value true
  });
  */
}

populateTestDataSetValue() {
  //setValue to set value for all properties
  this.customerForm.setValue({
    firstName:'Jack',
    lastName:'Harkness',
    email:'jack@torchwood.com',
    sendCategory: false
  })
}

populateTestDataPatchValue() {
  //pathchValue to set value for subset properties
  this.customerForm.patchValue({
    firstName:'Jack',
    lastName:'Harkness',
    sendCategory: false
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
