import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AddProjectComponent } from './add-project.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';


describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ FormsModule,ModalModule.forRoot(),HttpClientModule ],
      declarations: [ AddProjectComponent ],
      providers:[BsModalService,DatePipe]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(AddProjectComponent).toBeTruthy();
  });
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
