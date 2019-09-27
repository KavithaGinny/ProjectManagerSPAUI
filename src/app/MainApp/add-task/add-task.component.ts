import { Component, NgModule, OnInit, TemplateRef } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { TaskInformation } from '../../Modules/task-information';
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
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {


  // Task Properties Details Start
  public TaskId: number;
  public TaskDescription: string;
  public ParentId: number;
  public StartDate: string;
  public EndDate: string;
  public Priority: number;
  public TaskStatus: string;
  public UserId: number;
  public ProjectId: number;
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
      const ParentTaskDetails: ParentTask = { ParentId: 0, ParentTask1: this.TaskDescription };

      if (ParentTaskDetails.ParentTask1 === undefined || ParentTaskDetails.ParentTask1 === '') {
        this.IsformValid = false;
      } else {
        this.IsformValid = true;
        this._service.AddNewParentTask(ParentTaskDetails).subscribe(data => this.insertResult = data);
        this.IsParentAddedSuccessFully = true;
        form.reset();
      }

    } else {
      const Taskdetails: TaskInformation = {
        TaskId: 0,
        ParentId: this.ParentId,
        TaskDescription: this.TaskDescription,
        StartDate: this.StartDate,
        EndDate: this.EndDate,
        Priority: this.Priority,
        IsTaskCompleted: 0,
        ProjectId: this.ProjectId,
        UserId: this.UserId
      };
      if (Taskdetails.Priority === undefined) {
        Taskdetails.Priority = 15;
      }
      // tslint:disable-next-line:max-line-length
      if (Taskdetails.TaskDescription === undefined || Taskdetails.ParentId === undefined || Taskdetails.StartDate === undefined || Taskdetails.EndDate === undefined
        || Taskdetails.ProjectId === undefined || Taskdetails.UserId === undefined
        || Taskdetails.TaskDescription.length === 0) {
        this.IsformValid = false;
      } else if (Date.parse(Taskdetails.StartDate) > Date.parse(Taskdetails.EndDate)) {
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
    this.ProjectId = ProjectId;
    this.IsProjectSelected = true;
  }

  SelectParentTask(ParentId: number): void {
    this.ParentId = ParentId;
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
      this._service.GetAllProjects().subscribe(data => this.listProjects = data.filter(item => this.datepipe.transform(item.StartDate, 'yyyy-MM-dd') === this.datepipe.transform(projectSearchCriteria, 'yyyy-MM-dd') || this.datepipe.transform(item.EndDate, 'yyyy-MM-dd') === this.datepipe.transform(projectSearchCriteria, 'yyyy-MM-dd')
        // tslint:disable-next-line:max-line-length
        || item.ProjectId.toString() === projectSearchCriteria || item.ProjectDescription.toUpperCase() === projectSearchCriteria.toUpperCase()
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
      // tslint:disable-next-line:max-line-length
      this._service.GetAllUsers().subscribe(data => this.listUser = data.filter(item => item.FirstName.toUpperCase() === Searchdetail.toUpperCase() || item.LastName.toUpperCase() === Searchdetail.toUpperCase()
        || item.EmployeeId.toUpperCase() === Searchdetail.toUpperCase() || item.UserId.toString() === Searchdetail));

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
