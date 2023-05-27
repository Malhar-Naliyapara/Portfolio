import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPaymentMethodComponent } from './add-edit-payment-method.component';

describe('AddEditPaymentMethodComponent', () => {
  let component: AddEditPaymentMethodComponent;
  let fixture: ComponentFixture<AddEditPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
