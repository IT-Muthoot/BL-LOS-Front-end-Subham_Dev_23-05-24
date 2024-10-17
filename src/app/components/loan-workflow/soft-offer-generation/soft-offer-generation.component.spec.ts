import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftOfferGenerationComponent } from './soft-offer-generation.component';

describe('SoftOfferGenerationComponent', () => {
  let component: SoftOfferGenerationComponent;
  let fixture: ComponentFixture<SoftOfferGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftOfferGenerationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoftOfferGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
