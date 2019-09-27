import { Component, OnInit, NgModule, TemplateRef } from '@angular/core';
import { TaskInformation } from '../../Modules/task-information';
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
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  ProjectmodalRef: BsModalRef;
  ParentTaskmodalRef: BsModalRef;
  UsermodalRef: BsModalRef;
  public updateResult: any;
  public TaskId: number;
  public TaskInformation: string;
  public ParentId: number;
  public StartDate: string;
  public EndDate: string;
  public Priority: number;
  public TaskStatus: string;
  public UserId: number;
  public ProjectId: number;

  public IsformValid = true;
  public IsUpdatedSuccessFully = false;

  public IsProjectSelected = false;
  public IsStartDateGreater = false;
  public IsUserSelected = false;
  public IsParentTaskSelected = false;

  listProjects: Project[];
  listParentTask: ParentTask[];
  listUser: Users[];
  TaskDescription: string;
  // tslint:disable-next-line:max-line-length
  constructor(private _service: SharedService, private route: ActivatedRoute, private ProjectmodalServ: BsModalService, private ParentTaskmodalServ: BsModalService, private UsermodalServ: BsModalService, public datepipe: DatePipe) {
    this._service.GetAllProjects().subscribe(data => this.listProjects = data);
    this._service.GetAllParentTask().subscribe(data => this.listParentTask = data);
    this._service.GetAllUsers().subscribe(data => this.listUser = data);

    const id = this.route.snapshot.paramMap.get('taskid');
    // tslint:disable-next-line:radix
    this._service.GetTask(parseInt(id)).subscribe(data => {
    this.TaskId = data.TaskId;
    this.TaskDescription = data.TaskDescription;
    this.Priority = data.Priority;
   this.StartDate = data.StartDate;
    this.EndDate = data.EndDate;
    this.ParentId = data.ParentId;
  this.ProjectId = data.ProjectId;
   this.UserId = data.UserId; });


   }

  ngOnInit() {
  }

  UpdateTask(): void {
  this.IsStartDateGreater = false;
  const Taskdetails: TaskInformation = {TaskId: this.TaskId,
  ParentId: this.ParentId,
  TaskDescription: this.TaskDescription,
  StartDate: this.StartDate,
  EndDate: this.EndDate,
  Priority: this.Priority,
  IsTaskCompleted: 0,
  ProjectId : this.ProjectId,
  UserId: this.UserId};

// tslint:disable-next-line:max-line-length
if (Taskdetails.TaskDescription === undefined || Taskdetails.TaskDescription === '' || Taskdetails.StartDate === undefined || Taskdetails.EndDate === undefined) {
  this.IsformValid = false;
} else if (Date.parse(Taskdetails.StartDate) > Date.parse(Taskdetails.EndDate)) {this.IsUpdatedSuccessFully = false;
  this.IsformValid = true;
  this.IsStartDateGreater = true;
} else {
  this.IsformValid = true;
  this.IsStartDateGreater = false;
this._service.UpdateTask(Taskdetails.TaskId, Taskdetails).subscribe(data => this.updateResult = data);
this.IsUpdatedSuccessFully = true;

}
window.scroll(0, 0);

}


SelectProject(ProjectId: number): void {
    this.ProjectId = ProjectId;
    this.IsProjectSelected = true;
  }

  SelectParentTask(ParentId: number): void {
    this.ParentId = ParentId;
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
   item.ProjectId.toString() === projectSearchCriteria || item.ProjectDescription.toUpperCase() === projectSearchCriteria.toUpperCase()
  || item.Priority.toString() === projectSearchCriteria || item.ManagerUserId.toString() === projectSearchCriteria));

    } else {
      this._service.GetAllProjects().subscribe(data => this.listProjects = data);
    }

  }
  SearchParentTaskFilter(ParentTaskSearchCriteria: string): void {
    if (ParentTaskSearchCriteria !== undefined && ParentTaskSearchCriteria.length !== 0) {
  // tslint:disable-next-line:max-line-length
  this._service.GetAllParentTask().subscribe(data => this.listParentTask = data.filter(item => item.ParentId.toString() === ParentTaskSearchCriteria || item.ParentTask1.toUpperCase() === ParentTaskSearchCriteria.toUpperCase()));

    } else {
      this._service.GetAllParentTask().subscribe(data => this.listParentTask = data);
    }

  }
  trackParentTask(index: number, item: any) {

    return item ? item.ParentId : undefined;

  }
  trackProject(index: number, item: any) {

    return item ? item.ProjectId : undefined;

  }
  SelectUser(UserId: number): void {
    this.UserId = UserId;
    this.IsUserSelected = true;
  }
  trackUser(index: number, item: any) {

    return item ? item.UserId : undefined;

  }
  SearchUserFilter(Searchdetail: string): void {
    if (Searchdetail !== undefined && Searchdetail.length !== 0) {
  this._service.GetAllUsers().subscribe(data => this.listUser = data.filter(item => item.FirstName.toUpperCase() === Searchdetail.toUpperCase() || item.LastName.toUpperCase() === Searchdetail.toUpperCase()
  || item.EmployeeId.toUpperCase() === Searchdetail.toUpperCase() || item.UserId.toString() === Searchdetail ));

    } else {
      this._service.GetAllUsers().subscribe(data => this.listUser = data);
    }

  }
  openUserModal(tmpUser: TemplateRef<any>): void {
this.UsermodalRef = this.UsermodalServ.show(tmpUser);
  }
}
