import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousConfigFormComponent } from './miscellaneous-config-form.component';

describe('MiscellaneousConfigFormComponent', () => {
  let component: MiscellaneousConfigFormComponent;
  let fixture: ComponentFixture<MiscellaneousConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiscellaneousConfigFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiscellaneousConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
