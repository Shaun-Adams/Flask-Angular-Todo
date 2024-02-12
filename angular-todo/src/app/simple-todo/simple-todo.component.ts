import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Task {
  id?: number; // Made optional for new tasks that don't have an ID yet
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
  newTaskTitle: string = '';
  newTaskDescription: string = ''; // Optional: Add this if you have a description field
  editTaskTitle: string = '';
  showCompleted: boolean = false;
  filteredTasks: Task[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.http.get<Task[]>('http://localhost:4000/tasks').subscribe(tasks => {
      this.tasks = tasks;
    }, error => console.error(error));
  }

  addTask() {
    if (!this.newTaskTitle.trim()) {
      return;
    }
    const newTask: Task = {
      title: this.newTaskTitle,
      description: this.newTaskDescription, // Include if you have a description
      completed: false
    };
    this.tasks.push(newTask); // Optimistically add the task
    this.http.post<Task>('http://localhost:4000/add', newTask).subscribe(response => {
      // If the backend provides the ID, update the task
      newTask.id = response.id;
      this.newTaskTitle = ''; // Reset the title input
      this.newTaskDescription = ''; // Reset the description input if you have one
    }, error => {
      console.error('Failed to add the task:', error);
      // Remove the task if the POST failed
      this.tasks.pop();
    });
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id); // Optimistically remove the task
    this.http.delete(`http://localhost:4000/delete/${task.id}`).subscribe(() => {
      // Deletion successful
    }, error => {
      console.error('Failed to delete the task:', error);
      // If deletion failed, add the task back
      this.tasks.push(task);
    });
  }

  toggleTaskCompletion(task: Task) {
    const originalStatus = task.completed;
    task.completed = !task.completed; // Optimistically toggle completion
    this.http.put(`http://localhost:4000/edit/${task.id}`, { completed: task.completed })
      .subscribe(() => {
        // Toggle successful
      }, error => {
        console.error('Failed to toggle the task completion:', error);
        task.completed = originalStatus; // Revert the toggle on error
      });
  }

  startEditing(task: Task): void {
    task.isEditing = true;
    this.editTaskTitle = task.title; // Store the current title
  }

  cancelEditing(task: Task): void {
    task.isEditing = false;
  }

  saveTask(task: Task): void {
    const originalTitle = task.title;
    task.isEditing = false;
    task.title = this.editTaskTitle; // Optimistically update the title
    this.http.put(`http://localhost:4000/edit/${task.id}`, { title: task.title }).subscribe(() => {
      // Update successful
    }, error => {
      console.error('Failed to save the task:', error);
      task.title = originalTitle; // Revert the title on error
    });
  }

  filterTasks(showCompleted: boolean) {
    this.showCompleted = showCompleted;
    this.filteredTasks = this.tasks.filter(task => task.completed === showCompleted);
  }
}
