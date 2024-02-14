import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { AddTaskModalComponent } from './add-task-modal.component';

describe('AddTaskModalComponent', () => {
  let component: AddTaskModalComponent;
  let fixture: ComponentFixture<AddTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit taskAdded event when onAddTask is called', () => {
    spyOn(component.taskAdded, 'emit');
    component.title = 'Test Task';
    component.description = 'Test Description';
    component.onAddTask();
    expect(component.taskAdded.emit).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description'
    });
    expect(component.title).toBe('');
    expect(component.description).toBe('');
  });

  it('should emit closeModalEvent when closeModal is called', () => {
    spyOn(component.closeModalEvent, 'emit');
    component.closeModal();
    expect(component.closeModalEvent.emit).toHaveBeenCalled();
  });
});