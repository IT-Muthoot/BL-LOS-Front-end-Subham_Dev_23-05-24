import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentManagementBrowseComponent } from './agent-management-browse.component';

describe('AgentManagementBrowseComponent', () => {
  let component: AgentManagementBrowseComponent;
  let fixture: ComponentFixture<AgentManagementBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentManagementBrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentManagementBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
