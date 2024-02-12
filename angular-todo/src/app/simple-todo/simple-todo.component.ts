import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../edit-task-modal/edit-task-modal.component'; // Adjust path as needed


interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  isEditing?: boolean;
}

@Component({
  selector: 'app-simple-todo',
  templateUrl: './simple-todo.component.html',
  styleUrls: ['./simple-todo.component.css']
})
export class SimpleTodoComponent implements OnInit {
  tasks: Task[] = [];
  showCompleted = false;
  showModal = false;
  newTask: Partial<Task> = {};
  editTaskTitle: string = '';
  filteredTasks: Task[] = [];
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTasks();
  }

  handleCloseModal() {
    this.showModal = false;
  }

  getTasks(): void {
    this.http.get<Task[]>('http://localhost:4000/tasks').subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = this.tasks.filter(task => task.completed === this.showCompleted);
    }, error => console.error(error));
  }

  handleTaskAdded(task: { title: string, description?: string }) {
    this.addTask(task.title, task.description);
  }

  addTask(title: string, description?: string): void {
    if (!title.trim()) {
      return;
    }
    const newTask: Omit<Task, 'id'> = {
      title: title,
      description: description,
      completed: false
    };
    this.http.post<Task>('http://localhost:4000/add', newTask).subscribe({
      next: (response) => {
        this.tasks.push({ ...response });
        this.showModal = false;
        this.newTask = {};
      },
      error: (error) => {
        console.error('Failed to add the task:', error);
      },
      complete: () => {
        this.getTasks();
      }
    });
  }

  deleteTask(task: Task): void {
    this.http.delete(`http://localhost:4000/delete/${task.id}`).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.filteredTasks = this.tasks.filter(task => task.completed === this.showCompleted);
      },
      error: (error) => {
        console.error('Failed to delete the task:', error);
      }
    });
  }

  toggleTaskCompletion(task: Task): void {
    const originalStatus = task.completed;
    task.completed = !task.completed;
    this.http.put(`http://localhost:4000/edit/${task.id}`, { completed: task.completed }).subscribe({
      next: () => {
        this.filteredTasks = this.tasks.filter(task => task.completed === this.showCompleted);
      },
      error: (error) => {
        console.error('Failed to toggle the task completion:', error);
        task.completed = originalStatus; 
      }
    });
  }

  startEditing(task: Task): void {
    task.isEditing = true;
    this.editTaskTitle = task.title; 
  }

  cancelEditing(task: Task): void {
    task.isEditing = false;
  }

  saveTask(task: Task): void {
    const originalTitle = task.title;
    task.isEditing = false;
    task.title = this.editTaskTitle; 
    this.http.put(`http://localhost:4000/edit/${task.id}`, { title: task.title }).subscribe({
      error: (error) => {
        console.error('Failed to save the task:', error);
        task.title = originalTitle; 
      }
    });
  }

  filterTasks(showCompleted: boolean) {
    this.showCompleted = showCompleted;
    this.filteredTasks = this.tasks.filter(task => task.completed === showCompleted);
  }  
}
