import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleTodoComponent } from './simple-todo/simple-todo.component';
import { FormsModule } from '@angular/forms';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleTodoComponent,
    AddTaskModalComponent,
    EditTaskModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
