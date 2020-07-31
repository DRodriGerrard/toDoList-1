import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import { TasksService } from '../../tasks.service';
import { v4 as uuidv4 } from 'uuid';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  faPlus = faPlus;

  tasks: Task[] = [];
  newtask:string;

  constructor(private _taskS:TasksService) {}

  ngOnInit(): void {
    this.getTasks();
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
    this._taskS.postTasks(newTask);
    this.newtask = '';
    this.getTasks();
  }

  async getTasks(){
    await this._taskS.getTasks()
    .subscribe(response => {
      this.tasks = response;
    })
  }

  deleteTask(task:Task){
    this._taskS.deleteTask(task);
    this.getTasks();
  }

  taskCompleted(task:Task){
    this._taskS.editTask(task);
  }

  editTask(task:Task){
    this._taskS.editTask(task);
  }

}
