import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsConfiguration1SubmitComponent } from './ics-configuration1-submit.component';

describe('IcsConfiguration1SubmitComponent', () => {
  let component: IcsConfiguration1SubmitComponent;
  let fixture: ComponentFixture<IcsConfiguration1SubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcsConfiguration1SubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcsConfiguration1SubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
