import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiTrayComponent } from './emoji-tray.component';

describe('EmojiTrayComponent', () => {
  let component: EmojiTrayComponent;
  let fixture: ComponentFixture<EmojiTrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmojiTrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
