import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUnitMappingComponent } from './employee-unit-mapping.component';

describe('EmployeeUnitMappingComponent', () => {
  let component: EmployeeUnitMappingComponent;
  let fixture: ComponentFixture<EmployeeUnitMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeUnitMappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeUnitMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
