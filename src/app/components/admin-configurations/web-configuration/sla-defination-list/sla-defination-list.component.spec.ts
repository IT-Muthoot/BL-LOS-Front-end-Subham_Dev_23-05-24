import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaDefinationListComponent } from './sla-defination-list.component';

describe('SlaDefinationListComponent', () => {
  let component: SlaDefinationListComponent;
  let fixture: ComponentFixture<SlaDefinationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlaDefinationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlaDefinationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
