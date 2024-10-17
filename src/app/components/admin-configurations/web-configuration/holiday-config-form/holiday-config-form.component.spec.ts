import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayConfigFormComponent } from './holiday-config-form.component';

describe('HolidayConfigFormComponent', () => {
  let component: HolidayConfigFormComponent;
  let fixture: ComponentFixture<HolidayConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayConfigFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HolidayConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
