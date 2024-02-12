import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskModalComponent } from  './task-modal/task-modal.component';
import { SimpleTodoComponent } from './simple-todo/simple-todo.component';
import { JiraCloneTodoComponent } from './jira-clone-todo/jira-clone-todo.component'; // Import your component
import { FormsModule } from '@angular/forms';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    // TasksComponent,
    SimpleTodoComponent,
    JiraCloneTodoComponent,
    TaskModalComponent,
    AddTaskModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule // Add HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
