import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankConfigListComponent } from './bank-config-list.component';

describe('BankConfigListComponent', () => {
  let component: BankConfigListComponent;
  let fixture: ComponentFixture<BankConfigListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankConfigListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
