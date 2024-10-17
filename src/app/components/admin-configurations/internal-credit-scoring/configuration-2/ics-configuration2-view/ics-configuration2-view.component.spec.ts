import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsConfiguration2ViewComponent } from './ics-configuration2-view.component';

describe('IcsConfiguration2ViewComponent', () => {
  let component: IcsConfiguration2ViewComponent;
  let fixture: ComponentFixture<IcsConfiguration2ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcsConfiguration2ViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcsConfiguration2ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
