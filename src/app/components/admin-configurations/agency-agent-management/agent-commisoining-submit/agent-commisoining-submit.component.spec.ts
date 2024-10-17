import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCommisoiningSubmitComponent } from './agent-commisoining-submit.component';

describe('AgentCommisoiningSubmitComponent', () => {
  let component: AgentCommisoiningSubmitComponent;
  let fixture: ComponentFixture<AgentCommisoiningSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentCommisoiningSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentCommisoiningSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
