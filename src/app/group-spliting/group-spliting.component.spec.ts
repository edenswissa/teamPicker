import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSplitingComponent } from './group-spliting.component';

describe('GroupSplitingComponent', () => {
  let component: GroupSplitingComponent;
  let fixture: ComponentFixture<GroupSplitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSplitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSplitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
