import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanEligibilityCheckFormComponent } from './loan-eligibility-check-form.component';

describe('LoanEligibilityCheckFormComponent', () => {
  let component: LoanEligibilityCheckFormComponent;
  let fixture: ComponentFixture<LoanEligibilityCheckFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanEligibilityCheckFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanEligibilityCheckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
