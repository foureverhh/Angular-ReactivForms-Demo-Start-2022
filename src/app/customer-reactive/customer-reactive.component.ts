import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Customer } from '../model/Customer';

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
    lastName:['', [Validators.required, Validators.maxLength(50)]],// can pass object as well {value:'n/a', disabled: true},
    email: ['', [Validators.required, Validators.email]],
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
}
