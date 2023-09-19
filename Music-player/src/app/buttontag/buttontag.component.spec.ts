import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtontagComponent } from './buttontag.component';

describe('ButtontagComponent', () => {
  let component: ButtontagComponent;
  let fixture: ComponentFixture<ButtontagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtontagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtontagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
