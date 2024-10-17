import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipStagesViewComponent } from './skip-stages-view.component';

describe('SkipStagesViewComponent', () => {
  let component: SkipStagesViewComponent;
  let fixture: ComponentFixture<SkipStagesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkipStagesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkipStagesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
