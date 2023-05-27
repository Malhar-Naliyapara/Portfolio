import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAccessTokenComponent } from './add-edit-access-token.component';

describe('AddEditAccessTokenComponent', () => {
  let component: AddEditAccessTokenComponent;
  let fixture: ComponentFixture<AddEditAccessTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAccessTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAccessTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
