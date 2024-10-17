import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyManagementSubmitComponent } from './agency-management-submit.component';

describe('AgencyManagementSubmitComponent', () => {
  let component: AgencyManagementSubmitComponent;
  let fixture: ComponentFixture<AgencyManagementSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyManagementSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgencyManagementSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
