import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css']
})
export class EditTaskModalComponent {
  @Input() task: Task | null = null;
  @Output() taskUpdated = new EventEmitter<{ title: string; description?: string }>();
  @Output() closeModalEvent = new EventEmitter<void>();
  title: string = '';
  description?: string = '';
  showModal = false;

  handleCloseModal() {
    this.showModal = false;
}

  onEditTask() {
    if (!this.title.trim()) return;
    this.taskUpdated.emit({
      title: this.title,
      description: this.description
    });
    this.title = ''; 
    this.description = '';
    this.closeModal();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
