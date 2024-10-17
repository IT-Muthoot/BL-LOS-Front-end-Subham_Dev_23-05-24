import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBlacklistSubmitComponent } from './company-blacklist-submit.component';

describe('CompanyBlacklistSubmitComponent', () => {
  let component: CompanyBlacklistSubmitComponent;
  let fixture: ComponentFixture<CompanyBlacklistSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyBlacklistSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyBlacklistSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
