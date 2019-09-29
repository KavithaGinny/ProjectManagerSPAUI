import { Component, OnInit, TemplateRef, NgModule } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/Services/shared.service';
import { Project } from 'src/app/Modules/project';
import { Users } from 'src/app/Modules/users';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { stringify } from '@angular/core/src/util';
import { HttpClientModule } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [HttpClientModule],
  exports: [FormsModule]
})
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  // Project related Variables Start
  listProjects: Project[];
  public projectID: number;
  public projectName: string;
  public startDate: string;
  public endDate: string;
  public priority: number;
  public managerUserId: number;
  // Project related Variables End
  modalRef: BsModalRef;
  public Ischecked = false;
  listManager: Users[];

  public IsManagerSelected = false;
  public IsformValid = true;
  public IsAddedSuccessFully = false;
  public IsDeletedSuccessFully = false;
  public IsUpdatedSuccessFully = false;
  public IsStartDateGreater = true;
  public IsEdit = false;
  public ProjectDate: Date;
  public insertResult: any;
  constructor(private modalServ: BsModalService, private _service: SharedService, public datepipe: DatePipe) {

    this._service.GetAllUsers().subscribe(data => this.listManager = data);
    this._service.GetAllProjects().subscribe(data => this.listProjects = data);
  }
  ngOnInit() { }

  changeCheck(eve): void {
    if (eve.target.checked) {
      this.Ischecked = true;
    } else {
      this.Ischecked = false;
    }
  }

  openModal(tempManager: TemplateRef<any>): void {
    this.modalRef = this.modalServ.show(tempManager);
  }

  trackUser(index: number, item: any) {
    return item ? item.userID : undefined;
  }

  trackProject(index: number, item: any) {
    return item ? item.ProjectID : undefined;
  }
  SearchFilter(Searchdetail: string): void {
    if (Searchdetail !== undefined && Searchdetail.length !== 0) {      
      this._service
        .GetAllUsers()
        .subscribe(
          data =>
            (this.listManager = data.filter(
              item =>
                item.firstName.toUpperCase() === Searchdetail.toUpperCase() ||
                item.lastName.toUpperCase() === Searchdetail.toUpperCase() ||
                item.employeeID.toUpperCase() === Searchdetail.toUpperCase() ||
                item.userID.toString() === Searchdetail
            ))
        );
    } else {
      this._service.GetAllUsers().subscribe(data => (this.listManager = data));
    }
  }

  ProjectSearchFilter(projectSearchCriteria: string): void {
    if (
      projectSearchCriteria !== undefined &&
      projectSearchCriteria.length !== 0
    ) {    
      this._service
        .GetAllProjects()
        .subscribe(
          data =>
            (this.listProjects = data.filter(
              item =>
                this.datepipe.transform(item.startDate, 'yyyy-MM-dd') ===
                this.datepipe.transform(
                  projectSearchCriteria,
                  'yyyy-MM-dd'
                ) ||
                this.datepipe.transform(item.endDate, 'yyyy-MM-dd') ===
                this.datepipe.transform(
                  projectSearchCriteria,
                  'yyyy-MM-dd'
                ) ||
                item.projectID.toString() === projectSearchCriteria ||
                item.projectName.toUpperCase() ===
                projectSearchCriteria.toUpperCase() ||
                item.priority.toString() === projectSearchCriteria ||
                item.managerUserId.toString() === projectSearchCriteria
            ))
        );
    } else {
      this._service
        .GetAllProjects()
        .subscribe(data => (this.listProjects = data));
    }
  }
  StartDateSort(): void {
    this._service.GetAllProjects().subscribe(
      data =>
        (this.listProjects = data.sort((a, b) => {
          if (a.startDate < b.startDate) {
            return -1;
          } else if (a.startDate > b.startDate) {
            return 1;
          } else {
            return 0;
          }
        }))
    );
  }
  EndDateSort(): void {
    this._service.GetAllProjects().subscribe(
      data =>
        (this.listProjects = data.sort((a, b) => {
          if (a.endDate < b.endDate) {
            return -1;
          } else if (a.endDate > b.endDate) {
            return 1;
          } else {
            return 0;
          }
        }))
    );
  }
  PrioritySort(): void {
    this._service.GetAllProjects().subscribe(
      data =>
        (this.listProjects = data.sort((a, b) => {
          if (a.priority < b.priority) {
            return -1;
          } else if (a.priority > b.priority) {
            return 1;
          } else {
            return 0;
          }
        }))
    );
  }
  SelectManger(userIdManager: number): void {
    this.managerUserId = userIdManager;
    this.IsManagerSelected = true;
  }

  AddNewProject(form: NgForm): void {
    const Projectdetails: Project = {
      projectID: 0,
      projectName: this.projectName,
      priority: this.priority,
      managerUserId: this.managerUserId,
      startDate: '',
      endDate: ''
    };
    if (this.Ischecked) {
      Projectdetails.startDate = this.startDate;
      Projectdetails.endDate = this.endDate;
    } else {
      this.ProjectDate = new Date();
      Projectdetails.startDate = this.ProjectDate.toString();
      Projectdetails.endDate = this.ProjectDate.setDate(
        this.ProjectDate.getDate() + 1
      ).toString();

      Projectdetails.startDate = this.datepipe.transform(
        Projectdetails.startDate,
        'yyyy-MM-dd'
      );
      Projectdetails.endDate = this.datepipe.transform(
        Projectdetails.endDate,
        'yyyy-MM-dd'
      );
    }
    this.IsEdit = false;
    this.IsDeletedSuccessFully = false;
    this.IsUpdatedSuccessFully = false;
    if (Projectdetails.priority === undefined) {
      Projectdetails.priority = 15;
    }
    if (
      Projectdetails.projectName === undefined ||
      Projectdetails.managerUserId === undefined ||
      Projectdetails.startDate === undefined ||
      Projectdetails.endDate === undefined ||
      Projectdetails.projectName === '' ||
      Projectdetails.managerUserId === 0 ||
      Projectdetails.startDate === '' ||
      Projectdetails.endDate === ''
    ) {
      this.IsformValid = false;
      this.IsAddedSuccessFully = false;
    } else if (
      Date.parse(Projectdetails.startDate) > Date.parse(Projectdetails.endDate)
    ) {
      this.IsformValid = true;
      this.IsAddedSuccessFully = false;
      this.IsStartDateGreater = false;
    } else {
      this.IsformValid = true;
      this.IsStartDateGreater = true;
      this._service
        .AddNewProjects(Projectdetails)
        .subscribe(data => (this.insertResult = data));
      this.IsAddedSuccessFully = true;

      form.reset();
    }
    window.scroll(0, 0);
  }

  EditProjectBind(_project: Project): void {
    this.IsAddedSuccessFully = false;
    this.IsDeletedSuccessFully = false;
    this.IsUpdatedSuccessFully = false;
    this.IsformValid = true;
    this.IsEdit = true;
    this.projectID = _project.projectID;
    this.projectName = _project.projectName;
    this.priority = _project.priority;
    this.startDate = _project.startDate;
    this.endDate = _project.endDate;
    this.managerUserId = _project.managerUserId;
    window.scroll(0, 0);
  }
  UpdateProject(): void {
    let updateResult: any;
    const Projectdetails: Project = {
      projectID: this.projectID,
      projectName: this.projectName,
      priority: this.priority,
      managerUserId: this.managerUserId,
      startDate: this.startDate,
      endDate: this.endDate
    };
    if (
      Projectdetails.projectName === undefined ||
      Projectdetails.managerUserId === undefined ||
      Projectdetails.startDate === undefined ||
      Projectdetails.endDate === undefined ||
      Projectdetails.projectName === '' ||
      Projectdetails.priority === 0 ||
      Projectdetails.managerUserId === 0 ||
      Projectdetails.startDate === '' ||
      Projectdetails.endDate === ''
    ) {
      this.IsformValid = false;
      this.IsUpdatedSuccessFully = false;
    } else if (
      Date.parse(Projectdetails.startDate) > Date.parse(Projectdetails.endDate)
    ) {
      this.IsformValid = true;
      this.IsUpdatedSuccessFully = false;
      this.IsStartDateGreater = false;
    } else {
      this.IsformValid = true;
      this._service
        .UpdateProjects(Projectdetails.projectID, Projectdetails)
        .subscribe(data => (updateResult = data));
      this.IsUpdatedSuccessFully = true;
      this.IsDeletedSuccessFully = false;
      this.IsAddedSuccessFully = false;
    }
    window.scroll(0, 0);
    this.LoadProjectGrid();
  }

  DeleteProject(ProjectId: number): void {
    let DeleteResult: any;
    this._service
      .DeleteProjects(ProjectId)
      .subscribe(data => (DeleteResult = data));
    this.IsDeletedSuccessFully = true;
    this.IsUpdatedSuccessFully = false;
    this.IsAddedSuccessFully = false;
    this.IsformValid = true;
    window.scroll(0, 0);
  }
  LoadProjectGrid(): void {
    this._service
      .GetAllProjects()
      .subscribe(data => (this.listProjects = data));
  }
  ResetProjectForm(form: NgForm): void {
    form.reset();
    this.IsAddedSuccessFully = false;
    this.IsDeletedSuccessFully = false;
    this.IsUpdatedSuccessFully = false;
    this.IsformValid = true;
    this.IsStartDateGreater = true;
    this.IsEdit = false;
    window.scroll(0, 0);
  }
}
