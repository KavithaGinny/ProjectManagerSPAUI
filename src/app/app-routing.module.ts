import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddTaskComponent} from './MainApp/add-task/add-task.component';
import {AddUserComponent} from './MainApp/add-user/add-user.component';
import {AddProjectComponent} from './MainApp/add-project/add-project.component';
import {ViewTaskComponent} from './MainApp/view-task/view-task.component';
import {UpdateTaskComponent} from './MainApp/update-task/update-task.component';

const routes: Routes = [
  {path: 'add-task',component: AddTaskComponent},
  {path: 'add-project',component: AddProjectComponent},
  {path: 'add-user',component: AddUserComponent},
  {path: '', redirectTo: '/view-task' , pathMatch: 'full'},
  {path: 'view-task', component: ViewTaskComponent},
{path: 'update-task/:taskid', component: UpdateTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
