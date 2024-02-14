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

  editedTitle: string = '';
  editedDescription?: string = '';

  constructor() {}

  ngOnChanges(): void {
    if (this.task) {
      this.editedTitle = this.task.title;
      this.editedDescription = this.task.description;
    }
  }

  onEditTask() {
    if (this.task && this.editedTitle.trim()) {
      // Emit the updated task
      this.taskUpdated.emit({
        ...this.task,
        title: this.editedTitle,
        description: this.editedDescription,
      });
      this.closeModal();
    }
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
