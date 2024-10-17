import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadBrowseComponent } from './lead-browse.component';

describe('LeadBrowseComponent', () => {
  let component: LeadBrowseComponent;
  let fixture: ComponentFixture<LeadBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadBrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
