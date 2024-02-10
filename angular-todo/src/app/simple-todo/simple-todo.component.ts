import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Task {
  id: number;
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
  tasksToShow: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = ''; // Optional: Add this if you have a description field
  editTaskTitle: string = '';
  filteredTasks: Task[] = [];
  showCompleted: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.http.get<Task[]>('http://localhost:4000/tasks').subscribe(tasks => {
      this.tasks = tasks;
      this.tasksToShow = [...this.tasks]; // Initially show all tasks
    }, error => console.error(error));
  }

  addTask() {
    if (!this.newTaskTitle.trim()) {
      // Prevent adding empty tasks
      return;
    }
    const newTask = {
      title: this.newTaskTitle,
      description: this.newTaskDescription, // Optional: Add this if you have a description field
      completed: false
    };
    this.http.post('http://localhost:4000/add', newTask).subscribe(() => {
      this.getTasks(); // Refresh the list
      this.newTaskTitle = ''; // Reset the title input
      this.newTaskDescription = ''; // Reset the description input if you have one
    });
  }

  deleteTask(task: Task) {
    this.http.delete(`http://localhost:4000/delete/${task.id}`).subscribe(() => {
      this.getTasks(); // Refresh the list
    });
  }

  toggleTaskCompletion(task: Task) {
    this.http.put(`http://localhost:4000/edit/${task.id}`, { completed: !task.completed }).subscribe(() => {
      this.getTasks(); // Refresh the list
    });
  }

  startEditing(task: Task): void {
    task.isEditing = true;
    this.editTaskTitle = task.title; // Store the current title in case of canceling
  }

  cancelEditing(task: Task): void {
    task.isEditing = false;
  }

  saveTask(task: Task): void {
    task.isEditing = false;
    task.title = this.editTaskTitle; // Save the edited title
    this.http.put(`http://localhost:4000/edit/${task.id}`, { title: task.title }).subscribe(() => {
      this.getTasks(); // Refresh the list
    });
  }

  filterTasks(showCompleted: boolean) {
    this.showCompleted = showCompleted;
    this.filteredTasks = this.tasks.filter(task => task.completed === showCompleted);
  }
}