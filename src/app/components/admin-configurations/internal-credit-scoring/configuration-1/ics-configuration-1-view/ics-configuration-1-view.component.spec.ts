import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsConfiguration1ViewComponent } from './ics-configuration-1-view.component';

describe('IcsConfiguration1ViewComponent', () => {
  let component: IcsConfiguration1ViewComponent;
  let fixture: ComponentFixture<IcsConfiguration1ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcsConfiguration1ViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcsConfiguration1ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
