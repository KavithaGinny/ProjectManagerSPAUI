import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './MainApp/add-project/add-project.component';
import { AddUserComponent } from './MainApp/add-user/add-user.component';
import { AddTaskComponent } from './MainApp/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddUserComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
