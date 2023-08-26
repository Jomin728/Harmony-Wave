import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipCompComponent } from './tooltip-comp.component';

describe('TooltipCompComponent', () => {
  let component: TooltipCompComponent;
  let fixture: ComponentFixture<TooltipCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TooltipCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
