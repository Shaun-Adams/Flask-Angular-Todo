import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  display: boolean = false;
  taskTitle: string = '';
  taskDescription: string = '';

  @Output() taskAdded = new EventEmitter<{ title: string, description: string }>();

  open() {
    this.display = true;
  }

  close() {
    this.display = false;
    this.taskTitle = '';
    this.taskDescription = '';
  }

  save() {
    if (!this.taskTitle.trim()) {
      // Handle error or show a message
      return;
    }
    this.taskAdded.emit({
      title: this.taskTitle,
      description: this.taskDescription
    });
    this.close();
  }
}
