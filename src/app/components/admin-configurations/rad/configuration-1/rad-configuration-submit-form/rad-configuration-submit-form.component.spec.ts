import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadConfigurationSubmitFormComponent } from './rad-configuration-submit-form.component';

describe('RadConfigurationSubmitFormComponent', () => {
  let component: RadConfigurationSubmitFormComponent;
  let fixture: ComponentFixture<RadConfigurationSubmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadConfigurationSubmitFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadConfigurationSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
