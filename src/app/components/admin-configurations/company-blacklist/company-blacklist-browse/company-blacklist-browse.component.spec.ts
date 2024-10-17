import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBlacklistBrowseComponent } from './company-blacklist-browse.component';

describe('CompanyBlacklistBrowseComponent', () => {
  let component: CompanyBlacklistBrowseComponent;
  let fixture: ComponentFixture<CompanyBlacklistBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyBlacklistBrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyBlacklistBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
