import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderWritingPrefenceFormComponent } from './under-writing-prefence-form.component';

describe('UnderWritingPrefenceFormComponent', () => {
  let component: UnderWritingPrefenceFormComponent;
  let fixture: ComponentFixture<UnderWritingPrefenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderWritingPrefenceFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderWritingPrefenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
