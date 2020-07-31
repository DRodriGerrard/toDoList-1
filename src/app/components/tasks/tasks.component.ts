import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import { TasksService } from '../../tasks.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  newtask:string;

  constructor(private _taskS:TasksService) {
    this.getTasks();
  }

  ngOnInit(): void {}

  addNewTask(){
    const newDate = new Date();
    const finalDate = newDate.getFullYear()+'-'+newDate.getMonth()+'-'+newDate.getDate()+' at '
    + newDate.getHours()+':'+newDate.getMinutes()+':'+newDate.getSeconds();

    const newTask:Task = {
      id: uuidv4(),
      title: this.newtask,
      createDate: finalDate
    }
    this._taskS.postTasks(newTask);
    this.getTasks();
  }

  async getTasks(){
    await this._taskS.getTasks()
    .subscribe(response => {
      this.tasks = response;
    })
  }

}
