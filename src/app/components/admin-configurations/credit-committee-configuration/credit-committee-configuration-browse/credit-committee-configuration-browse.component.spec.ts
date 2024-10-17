import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCommitteeConfigurationBrowseComponent } from './credit-committee-configuration-browse.component';

describe('CreditCommitteeConfigurationBrowseComponent', () => {
  let component: CreditCommitteeConfigurationBrowseComponent;
  let fixture: ComponentFixture<CreditCommitteeConfigurationBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCommitteeConfigurationBrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditCommitteeConfigurationBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
