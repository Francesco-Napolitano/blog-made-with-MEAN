import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletepostComponent } from './deletepost.component';

describe('DeletepostComponent', () => {
  let component: DeletepostComponent;
  let fixture: ComponentFixture<DeletepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletepostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
