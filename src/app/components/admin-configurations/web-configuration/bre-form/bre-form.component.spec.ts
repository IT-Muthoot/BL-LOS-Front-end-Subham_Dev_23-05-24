import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreFormComponent } from './bre-form.component';

describe('BreFormComponent', () => {
  let component: BreFormComponent;
  let fixture: ComponentFixture<BreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
