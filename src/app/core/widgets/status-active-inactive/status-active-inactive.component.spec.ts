import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusActiveInactiveComponent } from './status-active-inactive.component';

describe('StatusActiveInactiveComponent', () => {
  let component: StatusActiveInactiveComponent;
  let fixture: ComponentFixture<StatusActiveInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusActiveInactiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusActiveInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
