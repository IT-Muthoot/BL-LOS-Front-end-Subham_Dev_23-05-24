import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadViewFormComponent } from './rad-view-form.component';

describe('RadViewFormComponent', () => {
  let component: RadViewFormComponent;
  let fixture: ComponentFixture<RadViewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadViewFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
