import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifypostComponent } from './modifypost.component';

describe('ModifypostComponent', () => {
  let component: ModifypostComponent;
  let fixture: ComponentFixture<ModifypostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifypostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifypostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
