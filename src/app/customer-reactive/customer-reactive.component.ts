import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Customer } from '../model/Customer';

@Component({
  selector: 'app-customer-reactive',
  templateUrl: './customer-reactive.component.html',
  styleUrls: ['./customer-reactive.component.css']
})
export class CustomerReactiveComponent implements OnInit {

customerForm: FormGroup;
customer: Customer = new Customer(); //model for backend
  
constructor() {
  this.customerForm = new FormGroup({});
}
ngOnInit(): void {

  //sync state and value with ngForm
  this.customerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    sendCategory: new FormControl(true), //with default value true
  });
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
