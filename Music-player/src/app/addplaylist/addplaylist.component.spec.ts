import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplaylistComponent } from './addplaylist.component';

describe('AddplaylistComponent', () => {
  let component: AddplaylistComponent;
  let fixture: ComponentFixture<AddplaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddplaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
