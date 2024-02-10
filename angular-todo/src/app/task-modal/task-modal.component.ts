import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  isVisible: boolean = false;
  taskTitle: string = '';
  taskDescription: string = '';
  
  @Output() taskAdded = new EventEmitter<{title: string, description: string}>();

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
    this.taskTitle = '';
    this.taskDescription = '';
  }

  addTask() {
    if (this.taskTitle.trim()) {
      this.taskAdded.emit({ 
        title: this.taskTitle, 
        description: this.taskDescription 
      });
      this.hide();
    }
  }
}
