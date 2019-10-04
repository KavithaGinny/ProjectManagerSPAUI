import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ FormsModule,HttpClientModule],
      declarations: [ AddUserComponent ],
      providers:[BsModalService,DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(AddUserComponent).toBeTruthy();
  });
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
