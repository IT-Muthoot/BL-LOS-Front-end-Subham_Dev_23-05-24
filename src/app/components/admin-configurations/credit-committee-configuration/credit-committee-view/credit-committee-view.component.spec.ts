import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCommitteeViewComponent } from './credit-committee-view.component';

describe('CreditCommitteeViewComponent', () => {
  let component: CreditCommitteeViewComponent;
  let fixture: ComponentFixture<CreditCommitteeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCommitteeViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditCommitteeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
