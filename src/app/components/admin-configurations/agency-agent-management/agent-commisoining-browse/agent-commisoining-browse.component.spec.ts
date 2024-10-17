import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCommisoiningBrowseComponent } from './agent-commisoining-browse.component';

describe('AgentCommisoiningBrowseComponent', () => {
  let component: AgentCommisoiningBrowseComponent;
  let fixture: ComponentFixture<AgentCommisoiningBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentCommisoiningBrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentCommisoiningBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
