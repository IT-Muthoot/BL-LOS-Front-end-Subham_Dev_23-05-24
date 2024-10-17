import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementSubmitFormComponent } from './user-management-submit-form.component';

describe('UserManagementSubmitFormComponent', () => {
  let component: UserManagementSubmitFormComponent;
  let fixture: ComponentFixture<UserManagementSubmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementSubmitFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserManagementSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
