import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTokenListComponent } from './access-token-list.component';

describe('AccessTokenListComponent', () => {
  let component: AccessTokenListComponent;
  let fixture: ComponentFixture<AccessTokenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessTokenListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessTokenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
