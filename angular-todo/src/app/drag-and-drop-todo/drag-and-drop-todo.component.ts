import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Task {
  id: number;
  name: string;
}

interface List {
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-drag-and-drop-todo',
  templateUrl: './drag-and-drop-todo.component.html',
  styleUrls: ['./drag-and-drop-todo.component.css']
})
export class DragAndDropTodoComponent implements OnInit {
  board: List[] = [
    {
      title: 'TO DO',
      tasks: [
        { id: 1, name: 'Task 1' },
        // More tasks...
      ]
    },
    {
      title: 'IN PROGRESS',
      tasks: [
        // Tasks in progress...
      ]
    },
    {
      title: 'DONE',
      tasks: [
        // Completed tasks...
      ]
    }
  ];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
