import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionItemsComponent } from './user-action-items.component';

describe('UserActionItemsComponent', () => {
  let component: UserActionItemsComponent;
  let fixture: ComponentFixture<UserActionItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActionItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
