import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchConfigListComponent } from './branch-config-list.component';

describe('BranchConfigListComponent', () => {
  let component: BranchConfigListComponent;
  let fixture: ComponentFixture<BranchConfigListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchConfigListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
