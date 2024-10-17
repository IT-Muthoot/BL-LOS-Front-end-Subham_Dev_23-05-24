import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalKycListComponent } from './digital-kyc-list.component';

describe('DigitalKycListComponent', () => {
  let component: DigitalKycListComponent;
  let fixture: ComponentFixture<DigitalKycListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalKycListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitalKycListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
