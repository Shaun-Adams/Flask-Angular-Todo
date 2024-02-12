import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { TaskModalComponent } from  './task-modal/task-modal.component';
import { SimpleTodoComponent } from './simple-todo/simple-todo.component';
// import { JiraCloneTodoComponent } from './jira-clone-todo/jira-clone-todo.component'; // Import your component
import { FormsModule } from '@angular/forms';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { DragAndDropTodoComponent } from './drag-and-drop-todo/drag-and-drop-todo.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    // TasksComponent,
    SimpleTodoComponent,
    // JiraCloneTodoComponent,
    // TaskModalComponent,
    DragAndDropTodoComponent,
    AddTaskModalComponent,
    DragAndDropTodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    HttpClientModule // Add HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
