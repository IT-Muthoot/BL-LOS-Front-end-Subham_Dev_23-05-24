import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestingComponent } from './security-questing.component';

describe('SecurityQuestingComponent', () => {
  let component: SecurityQuestingComponent;
  let fixture: ComponentFixture<SecurityQuestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityQuestingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecurityQuestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
