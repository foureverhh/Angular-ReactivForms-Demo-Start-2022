import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm , FormControl} from '@angular/forms';
import { Customer } from 'src/app/model/Customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customer: Customer = new Customer();
  
  constructor() { }

  ngOnInit(): void {
    this.customerForm = new FormGroup({});
  }

  save(customerForm: NgForm): void {
    console.log(customerForm.form);
    console.log('Saved: ' + JSON.stringify(customerForm.value));
  }
}
