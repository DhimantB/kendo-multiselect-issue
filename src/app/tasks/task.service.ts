import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public readonly _notifyOnRefreshLogs: Subject<number[]> = new Subject();

  constructor() { }
}
