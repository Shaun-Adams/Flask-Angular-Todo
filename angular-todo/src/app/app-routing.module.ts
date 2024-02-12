// Typical import statements for routing
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the TasksComponent
import { DragAndDropTodoComponent  } from './drag-and-drop-todo/drag-and-drop-todo.component';
import { SimpleTodoComponent } from './simple-todo/simple-todo.component';

// Set up the routes
const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'drag-and-drop-todo-board', component: DragAndDropTodoComponent },
  { path: 'simple', component: SimpleTodoComponent },
  // ... other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
