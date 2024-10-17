import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaDefinationFormComponent } from './sla-defination-form.component';

describe('SlaDefinationFormComponent', () => {
  let component: SlaDefinationFormComponent;
  let fixture: ComponentFixture<SlaDefinationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlaDefinationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlaDefinationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
