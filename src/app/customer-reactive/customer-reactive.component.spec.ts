import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReactiveComponent } from './customer-reactive.component';

describe('CustomerReactiveComponent', () => {
  let component: CustomerReactiveComponent;
  let fixture: ComponentFixture<CustomerReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerReactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
