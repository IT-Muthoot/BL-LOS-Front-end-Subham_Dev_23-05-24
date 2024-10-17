import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementBrowseComponent } from './user-management-browse.component';

describe('UserManagementBrowseComponent', () => {
  let component: UserManagementBrowseComponent;
  let fixture: ComponentFixture<UserManagementBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementBrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserManagementBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
