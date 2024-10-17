import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPollBucketComponent } from './common-poll-bucket.component';

describe('CommonPollBucketComponent', () => {
  let component: CommonPollBucketComponent;
  let fixture: ComponentFixture<CommonPollBucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonPollBucketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonPollBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
