import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagedUserComponent } from './messaged-user.component';

describe('MessagedUserComponent', () => {
  let component: MessagedUserComponent;
  let fixture: ComponentFixture<MessagedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
