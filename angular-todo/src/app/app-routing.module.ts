// Typical import statements for routing
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the TasksComponent
import { TasksComponent } from './tasks/tasks.component';
import { SimpleTodoComponent } from './simple-todo/simple-todo.component';

// Set up the routes
const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  // { path: 'tasks', component: TasksComponent },
  { path: 'simple', component: SimpleTodoComponent },
  // ... other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
