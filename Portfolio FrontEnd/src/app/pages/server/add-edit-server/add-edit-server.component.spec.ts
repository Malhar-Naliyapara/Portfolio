import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditServerComponent } from './add-edit-server.component';

describe('AddEditServerComponent', () => {
  let component: AddEditServerComponent;
  let fixture: ComponentFixture<AddEditServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditServerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
