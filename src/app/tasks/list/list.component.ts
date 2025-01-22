import {Component, OnInit} from '@angular/core';
import {
    CreateFormGroupArgs,
    DataBindingDirective,
    EditMode,
    MonthViewComponent, ReactiveEditingDirective,
    SchedulerComponent,
    SchedulerEvent
} from '@progress/kendo-angular-scheduler';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {TaskService} from '../task.service';

@Component({
    selector: 'app-list',
    imports: [
        SchedulerComponent,
        MonthViewComponent,
        DataBindingDirective,
        ReactiveEditingDirective
    ],
    templateUrl: './list.component.html',
    standalone: true,
    styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
    public events: SchedulerEvent[] = [];

    public orgEvents: SchedulerEvent[] = [
        {
            id: 1,
            title: 'Breakfast',
            start: new Date('2018-10-22T09:00:00'),
            end: new Date('2018-10-22T09:30:00'),
            recurrenceRule: 'FREQ=DAILY;COUNT=1;',
            dataItem: 1
        },
        {
            id: 2,
            title: 'Brunch',
            start: new Date('2018-10-20T09:00:00'),
            end: new Date('2018-10-20T09:30:00'),
            recurrenceRule: 'FREQ=DAILY;COUNT=1;',
            dataItem: 2
        },
        {
            id: 3,
            title: 'Lunch',
            start: new Date('2018-10-10T09:00:00'),
            end: new Date('2018-10-10T09:30:00'),
            recurrenceRule: 'FREQ=DAILY;COUNT=1;',
            dataItem: 3
        },
        {
            id: 4,
            title: 'Dinner',
            start: new Date('2018-10-08T09:00:00'),
            end: new Date('2018-10-08T09:30:00'),
            recurrenceRule: 'FREQ=DAILY;COUNT=1;',
            dataItem: 4
        }, {
            id: 5,
            title: 'Breakfast',
            start: new Date('2018-10-05T09:00:00'),
            end: new Date('2018-10-05T09:30:00'),
            recurrenceRule: 'FREQ=DAILY;COUNT=1;',
            dataItem: 1
        },
        {
            id: 6,
            title: 'Brunch',
            start: new Date('2018-10-07T09:00:00'),
            end: new Date('2018-10-07T09:30:00'),
            recurrenceRule: 'FREQ=DAILY;COUNT=1;',
            dataItem: 2
        },
        {
            id: 7,
            title: 'Lunch',
            start: new Date('2018-10-09T09:00:00'),
            end: new Date('2018-10-09T09:30:00'),
            recurrenceRule: 'FREQ=DAILY;COUNT=1;',
            dataItem: 3
        },
        {
            id: 8,
            title: 'Dinner',
            start: new Date('2018-10-11T09:00:00'),
            end: new Date('2018-10-11T09:30:00'),
            recurrenceRule: 'FREQ=DAILY;COUNT=1;',
            dataItem: 4
        }
    ];

    public selectedDate: Date = new Date('2018-10-22T00:00:00');
    public formGroup!: FormGroup;

    public createFormGroup(args: CreateFormGroupArgs | any): FormGroup {
        const dataItem = args.dataItem;
        const isOccurrence = args.mode === (EditMode.Occurrence as any);
        const exceptions = isOccurrence ? [] : dataItem.recurrenceExceptions;

        this.formGroup = this.formBuilder.group(
            {
                id: args.isNew ? this.getNextId() : dataItem.id,
                start: [dataItem.start, Validators.required],
                end: [dataItem.end, Validators.required],
                startTimezone: [dataItem.startTimezone],
                endTimezone: [dataItem.endTimezone],
                isAllDay: dataItem.isAllDay,
                title: dataItem.title,
                description: dataItem.description,
                recurrenceRule: dataItem.recurrenceRule,
                recurrenceId: dataItem.recurrenceId,
                recurrenceExceptions: [exceptions],
            },
            {
                validator: this.startEndValidator,
            }
        );

        return this.formGroup;
    }

    constructor(private formBuilder: FormBuilder, private _activityLogService: TaskService) {
        this.createFormGroup = this.createFormGroup.bind(this);
        this.events = this.orgEvents;
    }

    refreshes12345: number[] = [];

    ngOnInit(): void {
        this._activityLogService._notifyOnRefreshLogs
            .subscribe((refreshes: number[]) => {
                this.refreshes12345 = refreshes;

                if (refreshes.length === 0) {
                    console.log('filter 0');
                    this.events = this.orgEvents.filter(x => refreshes.includes(x.dataItem));
                    //this.events = this.orgEvents;
                } else {
                    this.events = this.orgEvents.filter(x => refreshes.includes(x.dataItem));
                }
            });
    }

    public getNextId(): number {
        const len = this.events.length;

        return len === 0 ? 1 : this.events[this.events.length - 1].id + 1;
    }

    // @ts-ignore
    public startEndValidator: ValidatorFn = (fg: FormGroup) => {
        const start = fg.get('start')!.value;
        const end = fg.get('end')!.value;

        if (start !== null && end !== null && start.getTime() < end.getTime()) {
            return null;
        } else {
            return {range: 'End date must be greater than Start date'};
        }
    };

}
