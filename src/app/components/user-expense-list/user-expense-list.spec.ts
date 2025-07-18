import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExpenseList } from './user-expense-list';

describe('UserExpenseList', () => {
  let component: UserExpenseList;
  let fixture: ComponentFixture<UserExpenseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserExpenseList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserExpenseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
