import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagewiseDocumentChecklistConfigurationComponent } from './stagewise-document-checklist-configuration.component';

describe('StagewiseDocumentChecklistConfigurationComponent', () => {
  let component: StagewiseDocumentChecklistConfigurationComponent;
  let fixture: ComponentFixture<StagewiseDocumentChecklistConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StagewiseDocumentChecklistConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StagewiseDocumentChecklistConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
