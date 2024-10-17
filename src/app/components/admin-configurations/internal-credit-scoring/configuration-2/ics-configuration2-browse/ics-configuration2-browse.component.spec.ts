import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsConfiguration2BrowseComponent } from './ics-configuration2-browse.component';

describe('IcsConfiguration2BrowseComponent', () => {
  let component: IcsConfiguration2BrowseComponent;
  let fixture: ComponentFixture<IcsConfiguration2BrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcsConfiguration2BrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcsConfiguration2BrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
