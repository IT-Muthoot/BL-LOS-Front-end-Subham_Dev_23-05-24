import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilfulDefaulterBlacklistBrowseComponent } from './wilful-defaulter-blacklist-browse.component';

describe('WilfulDefaulterBlacklistBrowseComponent', () => {
  let component: WilfulDefaulterBlacklistBrowseComponent;
  let fixture: ComponentFixture<WilfulDefaulterBlacklistBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WilfulDefaulterBlacklistBrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WilfulDefaulterBlacklistBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
