import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchConfigFormComponent } from './branch-config-form.component';

describe('BranchConfigFormComponent', () => {
  let component: BranchConfigFormComponent;
  let fixture: ComponentFixture<BranchConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchConfigFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
