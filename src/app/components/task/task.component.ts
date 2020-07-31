import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {

  @Output() taskEmitter = new EventEmitter<Task>();
  @Input() task:Task;
  editable:boolean = false;

  constructor() { }

  ngOnInit(): void {}

  emitDelete(){
    this.taskEmitter.emit(this.task);
  }

}
