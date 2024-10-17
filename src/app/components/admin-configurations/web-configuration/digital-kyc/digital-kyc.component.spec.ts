import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalKycComponent } from './digital-kyc.component';

describe('DigitalKycComponent', () => {
  let component: DigitalKycComponent;
  let fixture: ComponentFixture<DigitalKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalKycComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitalKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
