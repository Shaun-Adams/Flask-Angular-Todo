import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.http.get('http://localhost:4000/tasks').subscribe((data: any) => {
      this.tasks = data;
    }, error => console.error(error));
  }

  addTask(titleInput: HTMLInputElement, descriptionInput: HTMLInputElement) {
    const newTask = {
      title: titleInput.value,
      description: descriptionInput.value,
      completed: false
    };
    this.http.post('http://localhost:4000/add', newTask).subscribe(() => {
      this.getTasks(); // Refresh the list
      titleInput.value = ''; // Reset the form
      descriptionInput.value = '';
    });
  }

  deleteTask(id: number) {
    this.http.delete(`http://localhost:4000/delete/${id}`).subscribe(() => {
      this.getTasks(); // Refresh the list
    });
  }

  toggleCompleted(id: number, completed: boolean) {
    this.http.put(`http://localhost:4000/edit/${id}`, { completed: !completed }).subscribe(() => {
      this.getTasks(); // Refresh the list
    });
  }
}
