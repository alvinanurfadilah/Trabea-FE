import { Router, Routes } from '@angular/router';
import { PartTimeEmployeesComponent } from './part-time-employees/part-time-employees.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkSchedulesComponent } from './work-schedules/work-schedules.component';
import { LoginComponent } from './auth/login/login.component';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { map } from 'rxjs';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';

export const routes: Routes = [
  {
    path: 'login',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [
      () => {
        const router = inject(Router);
        return inject(AuthService).isAuthenticated$.pipe(
          map((isAuthenticated) => {
            if (isAuthenticated) {
              router.navigate(['dashboard']);
              return false;
            } else {
              return true;
            }
          })
        );
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [
      () => {
        const router = inject(Router);
        return inject(AuthService).isAuthenticated$.pipe(
          map((isAuthenticated) => {
            if (!isAuthenticated) {
              router.navigate(['']);
              return false;
            } else {
              return true;
            }
          })
        );
      },
    ],
    data: {
      breadcrumb: 'Dashboard',
    },
  },
  {
    path: 'part-time-employee',
    component: PartTimeEmployeesComponent,
    loadChildren: () =>
      import('./part-time-employees/part-time-employees.routes').then(
        (mod) => mod.partTimeEmployeeRoutes
      ),
    canActivate: [
      () => {
        const router = inject(Router);
        return inject(AuthService).currentUser$.pipe(
          map((u) => {
            var getRole = u?.roles.find((r) => r.id)?.id;
            if (getRole === 1) {
              return true;
            } else {
              router.navigate(['unauthorize']);
              return false;
            }
          })
        );
      },
    ],
  },
  {
    path: 'work-schedule',
    component: WorkSchedulesComponent,
    loadChildren: () =>
      import('./work-schedules/work-schedules.routes').then(
        (mod) => mod.workScheduleRoutes
      ),
  },
  {
    path: 'unauthorize',
    component: UnauthorizeComponent,
    data: {
      breadcrumb: 'Unauthorize',
    },
  },
];
