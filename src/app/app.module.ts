import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './MainApp/add-project/add-project.component';
import { AddUserComponent } from './MainApp/add-user/add-user.component';
import { AddTaskComponent } from './MainApp/add-task/add-task.component';
import { ViewTaskComponent } from './MainApp/view-task/view-task.component';
import { UpdateTaskComponent } from './MainApp/update-task/update-task.component';

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
  bootstrap: [AppComponent]
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
