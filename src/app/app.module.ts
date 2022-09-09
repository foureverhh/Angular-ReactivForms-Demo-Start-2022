import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customers/customer.component';
import { CustomerReactiveComponent } from './customer-reactive/customer-reactive.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerReactiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
