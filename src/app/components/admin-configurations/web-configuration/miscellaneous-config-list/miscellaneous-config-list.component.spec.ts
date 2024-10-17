import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousConfigListComponent } from './miscellaneous-config-list.component';

describe('MiscellaneousConfigListComponent', () => {
  let component: MiscellaneousConfigListComponent;
  let fixture: ComponentFixture<MiscellaneousConfigListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiscellaneousConfigListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiscellaneousConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
