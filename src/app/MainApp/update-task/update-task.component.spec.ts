import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UpdateTaskComponent } from './update-task.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




describe('UpdateTaskComponent', () => {
  let component: UpdateTaskComponent;
  let fixture: ComponentFixture<UpdateTaskComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ FormsModule,HttpClientModule,RouterTestingModule],
      declarations: [ UpdateTaskComponent ],      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 // it('should create', () => {
//expect(UpdateTaskComponent).toBeTruthy();
//});
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
