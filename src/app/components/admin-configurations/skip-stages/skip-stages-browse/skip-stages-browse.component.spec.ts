import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipStagesBrowseComponent } from './skip-stages-browse.component';

describe('SkipStagesBrowseComponent', () => {
  let component: SkipStagesBrowseComponent;
  let fixture: ComponentFixture<SkipStagesBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkipStagesBrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkipStagesBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
