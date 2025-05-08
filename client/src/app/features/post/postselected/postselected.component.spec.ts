import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostselectedComponent } from './postselected.component';

describe('PostselectedComponent', () => {
  let component: PostselectedComponent;
  let fixture: ComponentFixture<PostselectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostselectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostselectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
