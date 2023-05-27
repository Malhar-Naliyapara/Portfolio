import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTechnologyComponent } from './add-edit-technology.component';

describe('AddEditTechnologyComponent', () => {
  let component: AddEditTechnologyComponent;
  let fixture: ComponentFixture<AddEditTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTechnologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
