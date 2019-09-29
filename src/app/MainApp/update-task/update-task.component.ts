import { Component, OnInit, NgModule, TemplateRef } from '@angular/core';
import { Task } from '../../Modules/task-information';
import { SharedService } from 'src/app/Services/shared.service';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ParentTask } from 'src/app/Modules/parent-task';
import { Users } from 'src/app/Modules/users';
import { DatePipe } from '@angular/common';
import { Project } from 'src/app/Modules/project';
@NgModule({
  imports: [BrowserModule, FormsModule, AngularFontAwesomeModule],
  providers: [ActivatedRoute]
})
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  ProjectmodalRef: BsModalRef;
  ParentTaskmodalRef: BsModalRef;
  UsermodalRef: BsModalRef;
  public updateResult: any;
  public taskID: number;
  public TaskInformation: string;
  public parentID: number;
  public startDate: string;
  public endDate: string;
  public priority: number;
  public taskStatus: string;
  public userID: number;
  public projectID: number;

  public IsformValid = true;
  public IsUpdatedSuccessFully = false;

  public IsProjectSelected = false;
  public IsStartDateGreater = false;
  public IsUserSelected = false;
  public IsParentTaskSelected = false;

  listProjects: Project[];
  listParentTask: ParentTask[];
  listUser: Users[];
  taskName: string;
  // tslint:disable-next-line:max-line-length
  constructor(private _service: SharedService, private route: ActivatedRoute, private ProjectmodalServ: BsModalService, private ParentTaskmodalServ: BsModalService, private UsermodalServ: BsModalService, public datepipe: DatePipe) {
    this._service.GetAllProjects().subscribe(data => this.listProjects = data);
    this._service.GetAllParentTask().subscribe(data => this.listParentTask = data);
    this._service.GetAllUsers().subscribe(data => this.listUser = data);

    const id = this.route.snapshot.paramMap.get('taskid');
    // tslint:disable-next-line:radix
    this._service.GetTask(parseInt(id)).subscribe(data => {
    this.taskID = data.taskID;
    this.taskName = data.taskName;
    this.priority = data.priority;
   this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.parentID = data.parentID;
  this.projectID = data.projectID;
   this.userID = data.userID; });


   }

  ngOnInit() {
  }

  UpdateTask(): void {
  this.IsStartDateGreater = false;
  const Taskdetails: Task = {taskID: this.taskID,
  parentID: this.parentID,
  taskName: this.taskName,
  startDate: this.startDate,
  endDate: this.endDate,
  priority: this.priority,
  status: 0,
  projectID : this.projectID,
  userID: this.userID};

// tslint:disable-next-line:max-line-length
if (Taskdetails.taskName === undefined || Taskdetails.taskName === '' || Taskdetails.startDate === undefined || Taskdetails.endDate === undefined) {
  this.IsformValid = false;
} else if (Date.parse(Taskdetails.startDate) > Date.parse(Taskdetails.endDate)) {this.IsUpdatedSuccessFully = false;
  this.IsformValid = true;
  this.IsStartDateGreater = true;
} else {
  this.IsformValid = true;
  this.IsStartDateGreater = false;
this._service.UpdateTask(Taskdetails.taskID, Taskdetails).subscribe(data => this.updateResult = data);
this.IsUpdatedSuccessFully = true;

}
window.scroll(0, 0);

}


SelectProject(ProjectId: number): void {
    this.projectID = ProjectId;
    this.IsProjectSelected = true;
  }

  SelectParentTask(ParentId: number): void {
    this.parentID = ParentId;
    this.IsParentTaskSelected = true;

  }
  openProjectModal(tmpProject: TemplateRef<any>): void {
this.ProjectmodalRef = this.ProjectmodalServ.show(tmpProject);
  }
  openParenttaskModal(tmpParentTask: TemplateRef<any>): void {
this.ParentTaskmodalRef = this.ParentTaskmodalServ.show(tmpParentTask);
  }
  SearchProjectFilter(projectSearchCriteria: string): void {
    if (projectSearchCriteria !== undefined && projectSearchCriteria.length !== 0) {
  this._service.GetAllProjects().subscribe(data => this.listProjects = data.filter(item =>
   item.projectID.toString() === projectSearchCriteria || item.projectName.toUpperCase() === projectSearchCriteria.toUpperCase()
  || item.priority.toString() === projectSearchCriteria || item.managerUserId.toString() === projectSearchCriteria));

    } else {
      this._service.GetAllProjects().subscribe(data => this.listProjects = data);
    }

  }
  SearchParentTaskFilter(ParentTaskSearchCriteria: string): void {
    if (ParentTaskSearchCriteria !== undefined && ParentTaskSearchCriteria.length !== 0) {
  // tslint:disable-next-line:max-line-length
  this._service.GetAllParentTask().subscribe(data => this.listParentTask = data.filter(item => item.parentID.toString() === ParentTaskSearchCriteria || item.parentTaskName.toUpperCase() === ParentTaskSearchCriteria.toUpperCase()));

    } else {
      this._service.GetAllParentTask().subscribe(data => this.listParentTask = data);
    }

  }
  trackParentTask(index: number, item: any) {

    return item ? item.parentID : undefined;

  }
  trackProject(index: number, item: any) {

    return item ? item.projectID : undefined;

  }
  SelectUser(UserId: number): void {
    this.userID = UserId;
    this.IsUserSelected = true;
  }
  trackUser(index: number, item: any) {

    return item ? item.userID : undefined;

  }
  SearchUserFilter(Searchdetail: string): void {
    if (Searchdetail !== undefined && Searchdetail.length !== 0) {
  this._service.GetAllUsers().subscribe(data => this.listUser = data.filter(item => item.firstName.toUpperCase() === Searchdetail.toUpperCase() || item.lastName.toUpperCase() === Searchdetail.toUpperCase()
  || item.employeeID.toUpperCase() === Searchdetail.toUpperCase() || item.userID.toString() === Searchdetail ));

    } else {
      this._service.GetAllUsers().subscribe(data => this.listUser = data);
    }

  }
  openUserModal(tmpUser: TemplateRef<any>): void {
this.UsermodalRef = this.UsermodalServ.show(tmpUser);
  }
}
