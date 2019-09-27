import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { Users } from 'src/app/Modules/users';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { stringify } from '@angular/core/src/util';
import { HttpClientModule } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [HttpClientModule],
  exports: [FormsModule]
})
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public insertResult: any;
  public UserId: number;
  public FirstName: string;
  public LastName: string;
  public EmployeeId: string;
  public IsformValid = true;
  public IsAddedSuccessFully = false;
  public IsDeletedSuccessFully = false;
  public IsUpdatedSuccessFully = false;
  public IsEdit = false;
  list: Users[];
  constructor(private _service: SharedService) {
    this._service.GetAllUsers().subscribe(data => (this.list = data));
  }

  ngOnInit() {}
  LoadUsersGrid(): void {
    this._service.GetAllUsers().subscribe(data => (this.list = data));
  }
  AddNewUser(form: NgForm): void {
    const Userdetails: Users = {
      UserId: 0,
      FirstName: this.FirstName,
      LastName: this.LastName,
      EmployeeId: this.EmployeeId
    };
    this.IsEdit = false;
    this.IsDeletedSuccessFully = false;
    this.IsUpdatedSuccessFully = false;
    if (
      Userdetails.FirstName === undefined ||
      Userdetails.LastName === undefined ||
      Userdetails.EmployeeId === undefined ||
      Userdetails.FirstName === '' ||
      Userdetails.LastName === '' ||
      Userdetails.EmployeeId === ''
    ) {
      this.IsformValid = false;
      this.IsAddedSuccessFully = false;
    } else {
      this.IsformValid = true;
      this._service
        .AddNewUser(Userdetails)
        .subscribe(data => (this.insertResult = data));
      this.IsAddedSuccessFully = true;

      form.reset();
    }
    window.scroll(0, 0);
  }
  EditUserBind(user: Users): void {
    this.IsAddedSuccessFully = false;
    this.IsDeletedSuccessFully = false;
    this.IsUpdatedSuccessFully = false;
    this.IsformValid = true;
    this.IsEdit = true;
    this.UserId = user.UserId;
    this.FirstName = user.FirstName;
    this.LastName = user.LastName;
    this.EmployeeId = user.EmployeeId;
    window.scroll(0, 0);
  }
  ResetUserForm(form: NgForm): void {
    form.reset();
    this.IsAddedSuccessFully = false;
    this.IsDeletedSuccessFully = false;
    this.IsUpdatedSuccessFully = false;
    this.IsformValid = true;
    this.IsEdit = false;
    window.scroll(0, 0);
  }
  trackUser(index: number, item: any) {
    return item ? item.UserId : undefined;
  }

  SearchFilter(Searchdetail: string): void {
    if (Searchdetail !== undefined && Searchdetail.length !== 0) {
      // tslint:disable-next-line:max-line-length
      this._service
        .GetAllUsers()
        .subscribe(
          data =>
            (this.list = data.filter(
              item =>
                item.FirstName.toUpperCase() === Searchdetail.toUpperCase() ||
                item.LastName.toUpperCase() === Searchdetail.toUpperCase() ||
                item.EmployeeId.toUpperCase() === Searchdetail.toUpperCase() ||
                item.UserId.toString() === Searchdetail
            ))
        );
    } else {
      this._service.GetAllUsers().subscribe(data => (this.list = data));
    }
  }

  FirstNameSort(): void {
    this._service.GetAllUsers().subscribe(
      data =>
        (this.list = data.sort((a, b) => {
          if (a.FirstName < b.FirstName) {
            return -1;
          } else if (a.FirstName > b.FirstName) {
            return 1;
          } else {
            return 0;
          }
        }))
    );
  }

  LastNameSort(): void {
    this._service.GetAllUsers().subscribe(
      data =>
        (this.list = data.sort((a, b) => {
          if (a.LastName < b.LastName) {
            return -1;
          } else if (a.LastName > b.LastName) {
            return 1;
          } else {
            return 0;
          }
        }))
    );
  }
  IdSort(): void {
    this._service.GetAllUsers().subscribe(
      data =>
        (this.list = data.sort((a, b) => {
          if (a.UserId < b.UserId) {
            return -1;
          } else if (a.UserId > b.UserId) {
            return 1;
          } else {
            return 0;
          }
        }))
    );
  }
  DeleteUser(UserId: number): void {
    let DeleteResult: any;
    this._service.DeleteUser(UserId).subscribe(data => (DeleteResult = data));
    this.IsDeletedSuccessFully = true;
    this.IsUpdatedSuccessFully = false;
    this.IsAddedSuccessFully = false;
    this.IsformValid = true;
    window.scroll(0, 0);
  }

  UpdateUser(): void {
    let updateResult: any;
    const Userdetails: Users = {
      UserId: this.UserId,
      FirstName: this.FirstName,
      LastName: this.LastName,
      EmployeeId: this.EmployeeId
    };
    if (
      Userdetails.FirstName === undefined ||
      Userdetails.LastName === undefined ||
      Userdetails.EmployeeId === undefined ||
      Userdetails.FirstName === '' ||
      Userdetails.LastName === '' ||
      Userdetails.EmployeeId === ''
    ) {
      this.IsformValid = false;
      this.IsUpdatedSuccessFully = false;
    } else {
      this.IsformValid = true;
      this._service
        .UpdateUser(Userdetails.UserId, Userdetails)
        .subscribe(data => (updateResult = data));
      this.IsUpdatedSuccessFully = true;
      this.IsDeletedSuccessFully = false;
      this.IsAddedSuccessFully = false;
    }
    window.scroll(0, 0);
  }
}
