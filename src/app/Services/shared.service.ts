import { Injectable, NgModule } from '@angular/core';
import {HttpClientModule, HttpClient } from '@angular/common/http';
import {Observable} from 'node_modules/rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../Modules/task-information';
import { Users } from '../Modules/users';
import { Project } from '../Modules/project';
import { ParentTask } from '../Modules/parent-task';

@NgModule({
  providers: [ HttpClient]
})
@Injectable({
  providedIn: 'root'
})
export class SharedService {
private _ApiUrl = 'http://localhost/WebAPI/api/';
  constructor(private _http: HttpClient) {

   }
// Users Related Methods Start

GetAllUsers(): Observable<Users[]> {
  return  this._http.get<Users[]>(this._ApiUrl + 'Users').pipe(map(x => x));
}
AddNewUser(Item: Users): Observable<any> {
  return this._http.post(this._ApiUrl + 'Users' , Item)
  .pipe(map(x => x));
}

UpdateUser(UserId: number, Item: Users): Observable<any> {
    return  this._http.put(this._ApiUrl + 'Users?id=' + UserId, Item).pipe(map(x => x));
  }
  DeleteUser(UserId: number): Observable<any> {
    return  this._http.delete(this._ApiUrl + 'Users?id=' + UserId).pipe(map(x => x));
  }
// Users Related Methods End
// Project Related Method Start
GetAllProjects(): Observable<Project[]> {
    return  this._http.get<Project[]>(this._ApiUrl + 'Projects').pipe(map(x => x));
  }
  AddNewProjects(Item: Project): Observable<any> {
    return this._http.post(this._ApiUrl + 'Projects', Item)
    .pipe(map(x => x));
  }

  UpdateProjects(ProjectId: number, Item: Project): Observable<any> {
      return  this._http.put(this._ApiUrl + 'Projects?id='+ ProjectId, Item).pipe(map(x => x));
    }
 DeleteProjects(ProjectId: number): Observable<any> {
      return  this._http.delete(this._ApiUrl + 'Projects?id=' + ProjectId).pipe(map(x => x));
    }
// Project Related Method End

// Task Start

AddNewParentTask(Item: ParentTask): Observable<any> {
    return this._http.post(this._ApiUrl + 'ParentTasks', Item)
    .pipe(map(x => x));
  }
  GetAllTask(): Observable<Task[]> {
    return  this._http.get<Task[]>(this._ApiUrl + 'Tasks').pipe(map(x => x));

  }
  GetTask(TaskId: number): Observable<Task> {
    return  this._http.get<Task>(this._ApiUrl + 'Tasks?id' + TaskId).pipe(map(x => x));

  }
  AddNewTask(task: Task): Observable<any> {
    return this._http.post(this._ApiUrl + 'Tasks', task)
    .pipe(map(x => x));
  }
  UpdateTask(TaskId: number, task: Task): Observable<any> {
    return  this._http.put(this._ApiUrl + 'Tasks?id=' + TaskId, task).pipe(map(x => x));
  }

  CompleteTaskFlagUpdate(TaskId:number, task: Task): Observable<any> {
    return  this._http.put(this._ApiUrl + 'Tasks?id=' + TaskId, task).pipe(map(x => x));
  }
  DeleteTask(TaskId: number): Observable<any> {
    return  this._http.delete(this._ApiUrl + 'Tasks?id=' + TaskId).pipe(map(x => x));
  }
  // Task End

  // Parent Task Start
  GetAllParentTask(): Observable<ParentTask[]> {
    return  this._http.get<ParentTask[]>(this._ApiUrl + 'ParentTasks').pipe(map(x => x));

  }
  // Parent Task End
}
