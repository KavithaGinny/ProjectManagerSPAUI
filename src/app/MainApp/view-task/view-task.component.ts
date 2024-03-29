import { Component, OnInit } from '@angular/core';
import { Task } from '../../Modules/task-information';
import { SharedService } from 'src/app/Services/shared.service';
import { DatePipe } from '@angular/common';
import { map, filter } from 'rxjs/operators';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [AngularFontAwesomeModule],

})
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks: Task[];
  constructor(private _service: SharedService, public datepipe: DatePipe) {
    this._service.GetAllTask().subscribe(data => this.tasks = data);

  }

  ngOnInit() {
  }


  DeleteTask(TaskId: number): void {
    let DeleteResult: any;
    this._service.DeleteTask(TaskId).subscribe(data => DeleteResult = data);

    this._service.GetAllTask().subscribe(data => this.tasks = data);
    alert('Task has been deleted successfully..!');
  }
  CompleteTaskFlagchange(Item: Task): void {
    let updateResult: any;
    Item.status = 1;
    this._service.CompleteTaskFlagUpdate(Item.taskID,Item).subscribe(data => updateResult = data);
    this._service.GetAllTask().subscribe(data => this.tasks = data);
    alert('Task has been marked as End..!');
  }
  TrackTask(index: number, item: any) {

    return item ? item.TaskID : undefined;

  }
  TaskFilter(taskdetail: string): void {
    if (taskdetail !== undefined && taskdetail.length !== 0) {
      // tslint:disable-next-line:max-line-length
      this._service.GetAllTask().subscribe(data => this.tasks = data.filter(item => item.taskName.toUpperCase() === taskdetail.toUpperCase()));
    } else {
      this._service.GetAllTask().subscribe(data => this.tasks = data);
    }

  }
  ParentTaskFilter(Parenttaskdetail: number): void {
    if (Parenttaskdetail !== undefined && Parenttaskdetail !== 0) {
      this._service.GetAllTask().subscribe(data => this.tasks = data.filter(item => item.parentID === Parenttaskdetail));
    } else {
      this._service.GetAllTask().subscribe(data => this.tasks = data);
    }

  }

  PriorityTaskFilter(taskPriority: number): void {
    if (taskPriority !== undefined && taskPriority !== 0) {

      this._service.GetAllTask().subscribe(data => this.tasks = data.filter(item => item.priority === taskPriority));
    } else {
      this._service.GetAllTask().subscribe(data => this.tasks = data);
    }

  }
  StartDateTaskFilter(StartDate: string): void {
    if (StartDate !== undefined && StartDate.length !== 0) {

      // tslint:disable-next-line:max-line-length
      this._service.GetAllTask().subscribe(data => this.tasks = data.filter(item => this.datepipe.transform(item.startDate, 'yyyy-MM-dd') > this.datepipe.transform(StartDate, 'yyyy-MM-dd')));
    } else {
      this._service.GetAllTask().subscribe(data => this.tasks = data);
    }
  }
  EndDateTaskFilter(endDate: string): void {
    if (endDate !== undefined && endDate.length !== 0) {
      // tslint:disable-next-line:max-line-length
      this._service.GetAllTask().subscribe(data => this.tasks = data.filter(item => this.datepipe.transform(item.endDate, 'yyyy-MM-dd') < this.datepipe.transform(endDate, 'yyyy-MM-dd')));
    } else {
      this._service.GetAllTask().subscribe(data => this.tasks = data);
    }
  }
}
