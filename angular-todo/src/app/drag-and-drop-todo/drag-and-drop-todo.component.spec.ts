import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropTodoComponent } from './drag-and-drop-todo.component';

describe('DragAndDropTodoComponent', () => {
  let component: DragAndDropTodoComponent;
  let fixture: ComponentFixture<DragAndDropTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndDropTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
