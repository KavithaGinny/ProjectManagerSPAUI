import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLinkDirectiveStub } from '../../testing/router-link-directive-stub';
import { DatePipe } from '@angular/common';


describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ FormsModule,HttpClientModule],
      declarations: [ ViewTaskComponent,RouterLinkDirectiveStub ],
      providers:[DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(ViewTaskComponent).toBeTruthy();
  });
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
