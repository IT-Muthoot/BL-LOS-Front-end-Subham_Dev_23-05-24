import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderWritingPreferenceComponent } from './under-writing-preference.component';

describe('UnderWritingPreferenceComponent', () => {
  let component: UnderWritingPreferenceComponent;
  let fixture: ComponentFixture<UnderWritingPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderWritingPreferenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderWritingPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
