import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRuleFormComponent } from './business-rule-form.component';

describe('BusinessRuleFormComponent', () => {
  let component: BusinessRuleFormComponent;
  let fixture: ComponentFixture<BusinessRuleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRuleFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessRuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
