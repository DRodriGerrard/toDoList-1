import { Injectable } from '@angular/core';
import { Task } from '../app/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  serverURL = 'http://localhost:3000/tasks';

  constructor(private _http:HttpClient) { }

  getTasks(){
    return this._http.get<Task[]>(this.serverURL)
  }

  postTasks(task:Task){
    return this._http.post<Task>(this.serverURL, task)
    .subscribe(response => response)
  }

  deleteTask(task){
    return this._http.delete<Task>(this.serverURL+'/'+task.id)
    .subscribe(response => response)
  }

  editTask(task:Task){
    return this._http.put<Task>(this.serverURL+'/'+task.id, task)
    .subscribe(response => response)
  }

  completeAllTasks(tasks:Task[]){
    return this._http.put<Task[]>(this.serverURL, tasks)
  }
}
