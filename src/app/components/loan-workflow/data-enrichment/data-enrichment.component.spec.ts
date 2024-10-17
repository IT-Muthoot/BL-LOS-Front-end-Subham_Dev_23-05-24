import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEnrichmentComponent } from './data-enrichment.component';

describe('DataEnrichmentComponent', () => {
  let component: DataEnrichmentComponent;
  let fixture: ComponentFixture<DataEnrichmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEnrichmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataEnrichmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
