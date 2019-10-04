import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ FormsModule,ModalModule.forRoot(),HttpClientModule],
      declarations: [ AddTaskComponent ],
      providers:[BsModalService,DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(AddTaskComponent).toBeTruthy();
  });
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
