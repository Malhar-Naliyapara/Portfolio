import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPortfolioComponent } from './add-edit-portfolio.component';

describe('AddEditPortfolioComponent', () => {
  let component: AddEditPortfolioComponent;
  let fixture: ComponentFixture<AddEditPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
