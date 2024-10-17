import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagewiseDocumentChecklistComponent } from './stagewise-document-checklist.component';

describe('StagewiseDocumentChecklistComponent', () => {
  let component: StagewiseDocumentChecklistComponent;
  let fixture: ComponentFixture<StagewiseDocumentChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StagewiseDocumentChecklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StagewiseDocumentChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
