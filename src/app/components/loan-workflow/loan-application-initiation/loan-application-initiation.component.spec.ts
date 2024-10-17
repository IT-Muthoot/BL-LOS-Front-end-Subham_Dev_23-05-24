import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApplicationInitiationComponent } from './loan-application-initiation.component';

describe('LoanApplicationInitiationComponent', () => {
  let component: LoanApplicationInitiationComponent;
  let fixture: ComponentFixture<LoanApplicationInitiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanApplicationInitiationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanApplicationInitiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
