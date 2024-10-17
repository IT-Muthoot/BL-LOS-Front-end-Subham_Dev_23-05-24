import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadManagementDashboardComponent } from './lead-management-dashboard.component';

describe('LeadManagementDashboardComponent', () => {
  let component: LeadManagementDashboardComponent;
  let fixture: ComponentFixture<LeadManagementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadManagementDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
