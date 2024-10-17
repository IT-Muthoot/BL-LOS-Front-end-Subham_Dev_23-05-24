import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentManagementSubmitComponent } from './agent-management-submit.component';

describe('AgentManagementSubmitComponent', () => {
  let component: AgentManagementSubmitComponent;
  let fixture: ComponentFixture<AgentManagementSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentManagementSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentManagementSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
