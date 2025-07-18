import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewExpense } from './add-new-expense';

describe('AddNewExpense', () => {
  let component: AddNewExpense;
  let fixture: ComponentFixture<AddNewExpense>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewExpense]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewExpense);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
