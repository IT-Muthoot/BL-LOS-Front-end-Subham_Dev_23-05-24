import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyManagementBrowseComponent } from './agency-management-browse.component';

describe('AgencyManagementBrowseComponent', () => {
  let component: AgencyManagementBrowseComponent;
  let fixture: ComponentFixture<AgencyManagementBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyManagementBrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgencyManagementBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
