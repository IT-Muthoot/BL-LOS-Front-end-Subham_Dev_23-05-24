import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsConfiguration2SubmitComponent } from './ics-configuration2-submit.component';

describe('IcsConfiguration2SubmitComponent', () => {
  let component: IcsConfiguration2SubmitComponent;
  let fixture: ComponentFixture<IcsConfiguration2SubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcsConfiguration2SubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcsConfiguration2SubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
