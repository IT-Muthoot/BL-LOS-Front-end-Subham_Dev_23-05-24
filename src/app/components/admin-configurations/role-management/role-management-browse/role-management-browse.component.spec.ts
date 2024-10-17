import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementBrowseComponent } from './role-management-browse.component';

describe('RoleManagementBrowseComponent', () => {
  let component: RoleManagementBrowseComponent;
  let fixture: ComponentFixture<RoleManagementBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleManagementBrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleManagementBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
