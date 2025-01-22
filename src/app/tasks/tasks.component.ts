import {Component} from '@angular/core';
import {MultiSelectComponent} from '@progress/kendo-angular-dropdowns';
import {FormsModule} from '@angular/forms';
import {TaskService} from './task.service';
import {ListComponent} from './list/list.component';

@Component({
    selector: 'app-tasks',
    imports: [
        MultiSelectComponent,
        FormsModule,
        ListComponent
    ],
    templateUrl: './tasks.component.html',
    standalone: true,
    styleUrl: './tasks.component.scss'
})
export class TasksComponent {

    filters: any = [
        {id: 1, description: 'Breakfast'},
        {id: 2, description: 'Brunch'},
        {id: 3, description: 'Lunch'},
        {id: 4, description: 'Dinner'},
        {id: 5, description: 'Snacks'}
    ];

    selectedFilters: number[] = [];

    constructor(private _taskService: TaskService) {
    }

    refreshLogs() {
        this._taskService._notifyOnRefreshLogs.next(this.selectedFilters);
    }

    onClose($event: any) {
        // console.log('on close');
        // $event.preventDefault();
    }

    onInputBlur($event: any, multiSelect: MultiSelectComponent) {
        // console.log('onInputBlur');
        // multiSelect.toggle(false);
    }
}
