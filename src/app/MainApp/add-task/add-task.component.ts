import { Component, NgModule, OnInit, TemplateRef } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { Task } from '../../Modules/task-information';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { stringify } from '@angular/core/src/util';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ParentTask } from 'src/app/Modules/parent-task';
import { Users } from 'src/app/Modules/users';
import { DatePipe } from '@angular/common';
import { Project } from 'src/app/Modules/project';
@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, AngularFontAwesomeModule, ReactiveFormsModule],
  providers: [HttpClientModule],
  exports: [FormsModule]
})
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {


  // Task Properties Details Start
  public taskID: number;
  public taskName: string;
  public parentID: number;
  public startDate: string;
  public endDate: string;
  public priority: number;
  public taskStatus: string;
  public userID: number;
  public projectID: number;
  // Task Properties Details Start
  // List Objects Holder Start
  listProjects: Project[];
  listParentTask: ParentTask[];
  listUser: Users[];
  // List Objects Holder End
  // Properties To Validate Start
  public IsformValid = true;
  public IsAddedSuccessFully = false;
  public IsParentAddedSuccessFully = false;
  public IsProjectSelected = false;
  public IsParentTaskSelected = false;
  public IsStartDateGreater = false;
  public IsUserSelected = false;
  public Ischecked = false;
  // Properties To Validate End
  public insertResult: any;
  // Modal Reference Variables Start
  ProjectmodalReference: BsModalRef;
  ParentTaskModalReference: BsModalRef;
  UserModalReference: BsModalRef;
  // Modal Reference Variable End
  // tslint:disable-next-line:max-line-length
  constructor(private _service: SharedService, private ProjectmodalServ: BsModalService, private ParentTaskmodalServ: BsModalService, private UsermodalServ: BsModalService, public datepipe: DatePipe) {
    this._service.GetAllProjects().subscribe(data => this.listProjects = data);
    this._service.GetAllParentTask().subscribe(data => this.listParentTask = data);
    this._service.GetAllUsers().subscribe(data => this.listUser = data);
  }
  ngOnInit() {
  }
  // New Task Add Method
  AddNewTaskInformation(form: NgForm): void {
  this.IsParentAddedSuccessFully = false;

    if (this.Ischecked) {
      const ParentTaskDetails: ParentTask = { parentID: 0, parentTaskName: this.taskName };

      if (ParentTaskDetails.parentTaskName === undefined || ParentTaskDetails.parentTaskName === '') {
        this.IsformValid = false;
      } else {
        this.IsformValid = true;
        this._service.AddNewParentTask(ParentTaskDetails).subscribe(data => this.insertResult = data);
        this.IsParentAddedSuccessFully = true;
        form.reset();
      }

    } else {
      const Taskdetails: Task = {
        taskID: 0,
        parentID: this.parentID,
        taskName: this.taskName,
        startDate: this.startDate,
        endDate: this.endDate,
        priority: this.priority,
        status: 0,
        projectID: this.projectID,
        userID: this.userID
      };
      if (Taskdetails.priority === undefined) {
        Taskdetails.priority = 15;
      }      
      if (Taskdetails.taskName === undefined || Taskdetails.parentID === undefined || Taskdetails.startDate === undefined || Taskdetails.endDate === undefined
        || Taskdetails.projectID === undefined || Taskdetails.userID === undefined
        || Taskdetails.taskName.length === 0) {
        this.IsformValid = false;
      } else if (Date.parse(Taskdetails.startDate) > Date.parse(Taskdetails.endDate)) {
        this.IsformValid = true;
        this.IsAddedSuccessFully = false;
        this.IsStartDateGreater = true;
      } else {
        this.IsformValid = true;
        this.IsStartDateGreater = false;
        this._service.AddNewTask(Taskdetails).subscribe(data => this.insertResult = data);
        this.IsAddedSuccessFully = true;
        form.reset();
      }
    }
    window.scroll(0, 0);
  }
  ResetTaskForm(form: NgForm): void {
    form.reset();

    this.IsAddedSuccessFully = false;
    this.IsParentAddedSuccessFully = false;
    this.IsParentTaskSelected = false;
    this.IsUserSelected = false;
    this.IsProjectSelected = false;

    this.IsformValid = true;
    this.IsStartDateGreater = false;

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
    this.ProjectmodalReference = this.ProjectmodalServ.show(tmpProject);
  }
  openParenttaskModal(tmpParentTask: TemplateRef<any>): void {
    this.ParentTaskModalReference = this.ParentTaskmodalServ.show(tmpParentTask);
  }
  SearchProjectFilter(projectSearchCriteria: string): void {
    if (projectSearchCriteria !== undefined && projectSearchCriteria.length !== 0) {
      // tslint:disable-next-line:max-line-length
      this._service.GetAllProjects().subscribe(data => this.listProjects = data.filter(item => this.datepipe.transform(item.startDate, 'yyyy-MM-dd') === this.datepipe.transform(projectSearchCriteria, 'yyyy-MM-dd') || this.datepipe.transform(item.endDate, 'yyyy-MM-dd') === this.datepipe.transform(projectSearchCriteria, 'yyyy-MM-dd')
        // tslint:disable-next-line:max-line-length
        || item.projectID.toString() === projectSearchCriteria || item.projectName.toUpperCase() === projectSearchCriteria.toUpperCase()
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
  changeCheck(eve): void {
    if (eve.target.checked) {
      this.Ischecked = true;
    } else {
      this.Ischecked = false;
    }
  }
  trackParentTask(index: number, item: any) {

    return item ? item.ParentId : undefined;

  }
  trackProject(index: number, item: any) {

    return item ? item.ProjectID : undefined;

  }
  SelectUser(UserId: number): void {
    this.userID = UserId;
    this.IsUserSelected = true;
  }
  trackUser(index: number, item: any) {

    return item ? item.UserId : undefined;

  }
  SearchUserFilter(Searchdetail: string): void {
    if (Searchdetail !== undefined && Searchdetail.length !== 0) {
      // tslint:disable-next-line:max-line-length
      this._service.GetAllUsers().subscribe(data => this.listUser = data.filter(item => item.firstName.toUpperCase() === Searchdetail.toUpperCase() || item.lastName.toUpperCase() === Searchdetail.toUpperCase()
        || item.employeeID.toUpperCase() === Searchdetail.toUpperCase() || item.userID.toString() === Searchdetail));

    } else {
      this._service.GetAllUsers().subscribe(data => this.listUser = data);
    }

  }
  openUserModal(tmpUser: TemplateRef<any>): void {
    this.UserModalReference = this.UsermodalServ.show(tmpUser);
  }
  LoadParentTask(): void {
    this._service.GetAllParentTask().subscribe(data => this.listParentTask = data);
  }
}
