import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementSubmitComponent } from './role-management-submit.component';

describe('RoleManagementSubmitComponent', () => {
  let component: RoleManagementSubmitComponent;
  let fixture: ComponentFixture<RoleManagementSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleManagementSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleManagementSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
