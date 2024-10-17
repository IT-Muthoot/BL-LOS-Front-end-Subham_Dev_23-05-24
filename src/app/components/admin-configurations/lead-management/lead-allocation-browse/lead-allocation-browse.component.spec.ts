import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadAllocationBrowseComponent } from './lead-allocation-browse.component';

describe('LeadAllocationBrowseComponent', () => {
  let component: LeadAllocationBrowseComponent;
  let fixture: ComponentFixture<LeadAllocationBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadAllocationBrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadAllocationBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
