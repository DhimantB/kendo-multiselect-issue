import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TasksComponent} from './tasks/tasks.component';
import {TasksGridComponent} from './tasks-grid/tasks-grid.component';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'tasks', component: TasksComponent},
    {path: 'tasks-grid', component: TasksGridComponent},
];
