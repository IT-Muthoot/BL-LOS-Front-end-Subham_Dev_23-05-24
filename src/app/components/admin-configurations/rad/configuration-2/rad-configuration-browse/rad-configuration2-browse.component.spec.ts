import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadConfiguration2Component } from './rad-configuration2-browse.component';

describe('RadConfiguration2Component', () => {
  let component: RadConfiguration2Component;
  let fixture: ComponentFixture<RadConfiguration2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadConfiguration2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadConfiguration2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
