import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraCloneTodoComponent } from './jira-clone-todo.component';

describe('JiraCloneTodoComponent', () => {
  let component: JiraCloneTodoComponent;
  let fixture: ComponentFixture<JiraCloneTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JiraCloneTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JiraCloneTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
