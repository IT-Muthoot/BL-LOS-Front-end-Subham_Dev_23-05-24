import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankConfigFormComponent } from './bank-config-form.component';

describe('BankConfigFormComponent', () => {
  let component: BankConfigFormComponent;
  let fixture: ComponentFixture<BankConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankConfigFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
