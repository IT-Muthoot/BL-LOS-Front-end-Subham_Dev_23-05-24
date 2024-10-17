import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsConfiguration1BrowseComponent } from './ics-configuration1-browse.component';

describe('IcsConfiguration1BrowseComponent', () => {
  let component: IcsConfiguration1BrowseComponent;
  let fixture: ComponentFixture<IcsConfiguration1BrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcsConfiguration1BrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcsConfiguration1BrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
