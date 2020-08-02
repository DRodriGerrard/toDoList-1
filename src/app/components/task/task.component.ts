import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/task';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {

  faCheck = faCheck;
  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;

  @Output() taskEmitter = new EventEmitter<Task>();
  @Output() taskCompleted = new EventEmitter<Task>();
  @Output() taskNoCompleted = new EventEmitter<Task>();
  @Output() editEmitter = new EventEmitter<Task>();
  @Input() task:Task;
  editable:boolean = false;
  editing:boolean = false;
  

  constructor() { }

  ngOnInit(): void {}

  emitDelete(){
    const option = confirm('Are you sure?');
    if(option){
      this.taskEmitter.emit(this.task);
    }
  }

  emitComplete(){
    this.task.completed = true;
    this.taskCompleted.emit(this.task);
  }

  emitNoComplete(){
    this.task.completed = false;
    this.taskNoCompleted.emit(this.task);
  }

  enableEdit(){
    this.editing = true;
    this.editable = true;
  }

  emitEdit(){
    this.editing = false;
    this.editable = false;

    this.editEmitter.emit(this.task);
  }

}
