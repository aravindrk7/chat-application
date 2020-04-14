import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatterHeaderComponent } from './chatter-header.component';

describe('ChatterHeaderComponent', () => {
  let component: ChatterHeaderComponent;
  let fixture: ComponentFixture<ChatterHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatterHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
