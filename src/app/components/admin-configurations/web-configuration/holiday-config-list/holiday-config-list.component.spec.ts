import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayConfigListComponent } from './holiday-config-list.component';

describe('HolidayConfigListComponent', () => {
  let component: HolidayConfigListComponent;
  let fixture: ComponentFixture<HolidayConfigListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayConfigListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HolidayConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
