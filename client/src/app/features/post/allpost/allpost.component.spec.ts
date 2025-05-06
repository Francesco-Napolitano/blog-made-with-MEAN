import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllpostComponent } from './allpost.component';

describe('AllpostComponent', () => {
  let component: AllpostComponent;
  let fixture: ComponentFixture<AllpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
