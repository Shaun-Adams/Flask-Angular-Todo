import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css']
})
export class EditTaskModalComponent {
  @Input() task: Task | null = null;
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() closeModalEvent = new EventEmitter<void>();

  onEditTask() {
    if (this.task && this.task.title.trim()) {
      this.taskUpdated.emit(this.task);
    }
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
