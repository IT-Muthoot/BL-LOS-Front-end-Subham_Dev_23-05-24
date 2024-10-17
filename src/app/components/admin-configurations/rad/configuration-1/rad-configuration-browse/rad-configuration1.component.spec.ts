import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadConfiguration1Component } from './rad-configuration1.component';

describe('RadConfiguration1Component', () => {
  let component: RadConfiguration1Component;
  let fixture: ComponentFixture<RadConfiguration1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadConfiguration1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadConfiguration1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
