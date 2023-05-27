import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditThemeComponent } from './add-edit-theme.component';

describe('AddEditThemeComponent', () => {
  let component: AddEditThemeComponent;
  let fixture: ComponentFixture<AddEditThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
