import { Routes } from '@angular/router';
import { PartTimeEmployeeListComponent } from './part-time-employee-list/part-time-employee-list.component';
import { PartTimeEmployeeFormComponent } from './part-time-employee-form/part-time-employee-form.component';

export const partTimeEmployeeRoutes: Routes = [
  {
    path: '',
    component: PartTimeEmployeeListComponent,
    data: {
      breadcrumb: 'Part Time Employee',
    },
  },
  {
    path: 'add',
    component: PartTimeEmployeeFormComponent,
    data: {
      breadcrumb: 'Insert',
    },
  },
  {
    path: 'edit/:id',
    component: PartTimeEmployeeFormComponent,
    data: {
      breadcrumb: 'Edit',
    },
  },
];
