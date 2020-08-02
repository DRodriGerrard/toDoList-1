import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import { TasksService } from '../../tasks.service';
import { v4 as uuidv4 } from 'uuid';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  faPlus = faPlus;
  faCheck = faCheck;
  faTrash = faTrash;

  tasks: Task[] = [];
  newtask:string;

  allCompleted:boolean = false;
  confirmAllCompleted:boolean = false;

  constructor(private _taskS:TasksService) {}

  ngOnInit(): void {
    this.getTasks();
    this.allTaskCompleted();
  }

  addNewTask(){
    const newDate = new Date();
    const finalDate = newDate.getFullYear()+'-'+newDate.getMonth()+'-'+newDate.getDate()+' at '
    + newDate.getHours()+':'+newDate.getMinutes()+':'+newDate.getSeconds();

    const newTask:Task = {
      id: uuidv4(),
      title: this.newtask,
      createDate: finalDate,
      completed: false
    }
    this._taskS.postTasks(newTask).subscribe(() => {
      this.newtask = '';
      this.getTasks()
    })
  }

  async getTasks(){
    await this._taskS.getTasks()
    .subscribe(response => {
      this.tasks = response;
    })
  }

  async deleteTask(task:Task){
    await this._taskS.deleteTask(task)
    .subscribe( () => this.getTasks())
    
  }

  taskCompleted(task:Task){
    this._taskS.editTask(task);
  }

  taskNoCompleted(task:Task){
    this._taskS.editTask(task);
  }

  editTask(task:Task){
    this._taskS.editTask(task);
  }

  completeTasks(){
    this.tasks.forEach(async task =>{
      task.completed = true;
      this._taskS.editTask(task)
      this.allTaskCompleted();
    })
  }

  noCompleteTasks(){
    this.tasks.forEach(async task =>{
      task.completed = false;
      this._taskS.editTask(task)
      this.allTaskCompleted();
    })
  }

  allTaskCompleted(){
    this.tasks.forEach(task =>{
      if(task.completed === true){
        this.confirmAllCompleted = true;
      }
      else{
        this.confirmAllCompleted = false;
      }
    })
  }

  deleteAllTasks(){
    const option = confirm('Are yo sure you want to delete all your tasks?');
    if(option){
      this.tasks.forEach(async task =>{
        await this._taskS.deleteTask(task)
        this.getTasks();
      })
    }
  }
}
