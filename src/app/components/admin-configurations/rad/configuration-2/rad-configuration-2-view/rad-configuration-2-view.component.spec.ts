import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadConfiguration2ViewComponent } from './rad-configuration-2-view.component';

describe('RadConfiguration2ViewComponent', () => {
  let component: RadConfiguration2ViewComponent;
  let fixture: ComponentFixture<RadConfiguration2ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadConfiguration2ViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadConfiguration2ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
