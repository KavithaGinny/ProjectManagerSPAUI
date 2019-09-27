import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'node_modules/rxjs';
import { map } from 'rxjs/operators';
import { TaskInformation } from '../Modules/task-information';
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
private _ApiUrl = 'http://localhost/FinalSBAService/api/';
  constructor(private _http: HttpClient) {

   }
// Users Related Methods Start

GetAllUsers(): Observable<Users[]> {
  return  this._http.get<Users[]>(this._ApiUrl + 'User').pipe(map(x => x));
}
AddNewUser(Item: Users): Observable<any> {
  return this._http.post(this._ApiUrl + 'User' , Item)
  .pipe(map(x => x));
}

UpdateUser(UserId: number, Item: Users): Observable<any> {
    return  this._http.put(this._ApiUrl + 'User?UserId=' + UserId, Item).pipe(map(x => x));
  }
  DeleteUser(UserId: number): Observable<any> {
    return  this._http.delete(this._ApiUrl + 'User?UserId=' + UserId).pipe(map(x => x));
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
      return  this._http.put(this._ApiUrl + 'Projects?ProjectId='+ ProjectId, Item).pipe(map(x => x));
    }
 DeleteProjects(ProjectId: number): Observable<any> {
      return  this._http.delete(this._ApiUrl + 'Projects?ProjectId=' + ProjectId).pipe(map(x => x));
    }
// Project Related Method End

// Task Start

AddNewParentTask(Item: ParentTask): Observable<any> {
    return this._http.post(this._ApiUrl + 'ParentTask', Item)
    .pipe(map(x => x));
  }
  GetAllTask(): Observable<TaskInformation[]> {
    return  this._http.get<TaskInformation[]>(this._ApiUrl + 'Task').pipe(map(x => x));

  }
  GetTask(TaskId: number): Observable<TaskInformation> {
    return  this._http.get<TaskInformation>(this._ApiUrl + 'Task?TaskId=' + TaskId).pipe(map(x => x));

  }
  AddNewTask(task: TaskInformation): Observable<any> {
    return this._http.post(this._ApiUrl + 'Task', task)
    .pipe(map(x => x));
  }
  UpdateTask(TaskId: number, task: TaskInformation): Observable<any> {
    return  this._http.put(this._ApiUrl + 'Task?TaskId=' + TaskId, task).pipe(map(x => x));
  }

  CompleteTaskFlagUpdate(TaskId:number, task: TaskInformation): Observable<any> {
    return  this._http.put(this._ApiUrl + 'Task?TaskId=' + TaskId, task).pipe(map(x => x));
  }
  DeleteTask(TaskId: number): Observable<any> {
    return  this._http.delete(this._ApiUrl + 'Task?TaskId=' + TaskId).pipe(map(x => x));
  }
  // Task End

  // Parent Task Start
  GetAllParentTask(): Observable<ParentTask[]> {
    return  this._http.get<ParentTask[]>(this._ApiUrl + 'ParentTask').pipe(map(x => x));

  }
  // Parent Task End
}
