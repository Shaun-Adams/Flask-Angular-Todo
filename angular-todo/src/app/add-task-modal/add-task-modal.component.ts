import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css']
})
export class AddTaskModalComponent {
  @Output() taskAdded = new EventEmitter<{ title: string; description?: string }>();
  @Output() closeModalEvent = new EventEmitter<void>();
  title: string = '';
  description?: string = '';
  showModal = false;

  handleCloseModal() {
    this.showModal = false;
}

  onAddTask() {
    if (!this.title.trim()) return;
    this.taskAdded.emit({
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
