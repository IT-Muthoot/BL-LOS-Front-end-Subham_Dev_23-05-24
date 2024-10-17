import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilfulDefaulterBlacklistSubmitComponent } from './wilful-defaulter-blacklist-submit.component';

describe('WilfulDefaulterBlacklistSubmitComponent', () => {
  let component: WilfulDefaulterBlacklistSubmitComponent;
  let fixture: ComponentFixture<WilfulDefaulterBlacklistSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WilfulDefaulterBlacklistSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WilfulDefaulterBlacklistSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
