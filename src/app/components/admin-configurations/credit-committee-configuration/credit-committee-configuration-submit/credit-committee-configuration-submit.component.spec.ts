import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCommitteeConfigurationSubmitComponent } from './credit-committee-configuration-submit.component';

describe('CreditCommitteeConfigurationSubmitComponent', () => {
  let component: CreditCommitteeConfigurationSubmitComponent;
  let fixture: ComponentFixture<CreditCommitteeConfigurationSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCommitteeConfigurationSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditCommitteeConfigurationSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
