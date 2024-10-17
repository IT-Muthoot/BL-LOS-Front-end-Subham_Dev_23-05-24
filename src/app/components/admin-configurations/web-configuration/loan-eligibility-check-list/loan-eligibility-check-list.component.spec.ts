import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanEligibilityCheckListComponent } from './loan-eligibility-check-list.component';

describe('LoanEligibilityCheckListComponent', () => {
  let component: LoanEligibilityCheckListComponent;
  let fixture: ComponentFixture<LoanEligibilityCheckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanEligibilityCheckListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanEligibilityCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
