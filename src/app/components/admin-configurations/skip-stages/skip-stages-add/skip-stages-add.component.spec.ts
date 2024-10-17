import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipStagesAddComponent } from './skip-stages-add.component';

describe('SkipStagesAddComponent', () => {
  let component: SkipStagesAddComponent;
  let fixture: ComponentFixture<SkipStagesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkipStagesAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkipStagesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
