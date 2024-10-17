import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadConfiguration2SubmitFormComponent } from './rad-configuration2-submit-form.component';

describe('RadConfiguration2SubmitFormComponent', () => {
  let component: RadConfiguration2SubmitFormComponent;
  let fixture: ComponentFixture<RadConfiguration2SubmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadConfiguration2SubmitFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadConfiguration2SubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
