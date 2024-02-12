import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SimpleTodoComponent } from './simple-todo.component';

describe('SimpleTodoComponent', () => {
  let component: SimpleTodoComponent;
  let fixture: ComponentFixture<SimpleTodoComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleTodoComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTodoComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tasks on initialization', () => {
    const tasks = [{ id: 1, title: 'Task 1', description: 'Description 1', completed: false }];
    component.ngOnInit();
    const req = httpMock.expectOne('http://localhost:4000/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(tasks);
    expect(component.tasks).toEqual(tasks);
    expect(component.filteredTasks).toEqual(tasks);
  });

  it('should add a task', () => {
    const newTask = { title: 'New Task', description: 'New Description' };
    component.handleTaskAdded(newTask);
    const req = httpMock.expectOne('http://localhost:4000/add');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 2, ...newTask });
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe(newTask.title);
    expect(component.showModal).toBe(false);
    expect(component.newTask).toEqual({});
  });

  it('should delete a task', () => {
    const task = { id: 1, title: 'Task 1', description: 'Description 1', completed: false };
    component.deleteTask(task);
    const req = httpMock.expectOne(`http://localhost:4000/delete/${task.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
    expect(component.tasks.length).toBe(0);
    expect(component.filteredTasks.length).toBe(0);
  });

  it('should toggle task completion', () => {
    const task = { id: 1, title: 'Task 1', description: 'Description 1', completed: false };
    component.toggleTaskCompletion(task);
    const req = httpMock.expectOne(`http://localhost:4000/edit/${task.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
    expect(task.completed).toBe(true);
    expect(component.filteredTasks.length).toBe(1);
  });

  it('should start editing a task', () => {
    const task: { id: number; title: string; description: string; completed: boolean; isEditing: boolean } = { id: 1, title: 'Task 1', description: 'Description 1', completed: false, isEditing: false };
    component.startEditing(task);
    expect(task.isEditing).toBe(true);
    expect(component.editTaskTitle).toBe(task.title);
  });

  it('should cancel editing a task', () => {
    const task: { id: number; title: string; description: string; completed: boolean; isEditing: boolean } = { id: 1, title: 'Task 1', description: 'Description 1', completed: false, isEditing: true };
    component.cancelEditing(task);
    expect(task.isEditing).toBe(false);
  });

  it('should save a task', () => {
    const task: { id: number; title: string; description: string; completed: boolean; isEditing: boolean } = { id: 1, title: 'Task 1', description: 'Description 1', completed: false, isEditing: false };
    component.editTaskTitle = 'Updated Task';
    component.saveTask(task);
    const req = httpMock.expectOne(`http://localhost:4000/edit/${task.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
    expect(task.isEditing).toBe(false);
    expect(task.title).toBe(component.editTaskTitle);
  });

  it('should filter tasks', () => {
    const tasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', completed: false },
      { id: 2, title: 'Task 2', description: 'Description 2', completed: true }
    ];
    component.tasks = tasks;
    component.filterTasks(true);
    expect(component.showCompleted).toBe(true);
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].completed).toBe(true);
  });
});