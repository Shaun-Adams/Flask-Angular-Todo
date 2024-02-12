import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  taskTitle: string = '';
  taskDescription: string = '';
  showModal: boolean = false;

  @Output() onAddTask = new EventEmitter<{ title: string, description: string }>();

  addNewTask() {
    this.onAddTask.emit({
      title: this.taskTitle,
      description: this.taskDescription
    });
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.taskTitle = '';
    this.taskDescription = '';
  }

  openModal() {
    this.showModal = true;
  }
}
