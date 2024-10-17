import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreListComponent } from './bre-list.component';

describe('BreListComponent', () => {
  let component: BreListComponent;
  let fixture: ComponentFixture<BreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
