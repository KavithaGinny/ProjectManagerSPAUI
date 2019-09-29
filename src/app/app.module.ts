import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './MainApp/add-project/add-project.component';
import { AddUserComponent } from './MainApp/add-user/add-user.component';
import { AddTaskComponent } from './MainApp/add-task/add-task.component';
import { ViewTaskComponent } from './MainApp/view-task/view-task.component';
import { UpdateTaskComponent } from './MainApp/update-task/update-task.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {  DatePipe} from '@angular/common';
import {SharedService} from './Services/shared.service';


@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddUserComponent,
    AddTaskComponent,
    ViewTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [SharedService, HttpClientModule, HttpClient, DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
