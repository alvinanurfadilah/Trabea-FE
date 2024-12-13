import { Router, Routes } from '@angular/router';
import { WorkScheduleListComponent } from './work-schedule-list/work-schedule-list.component';
import { WorkScheduleFormComponent } from './work-schedule-form/work-schedule-form.component';
import { WorkScheduleReviewComponent } from './work-schedule-review/work-schedule-review.component';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs';

export const workScheduleRoutes: Routes = [
  {
    path: '',
    component: WorkScheduleListComponent,
    canActivate: [
      () => {
        const router = inject(Router);
        return inject(AuthService).currentUser$.pipe(
          map((u) => {
            var getRole = u?.roles.find((r) => r.id)?.id;
            if (getRole === 2 || getRole === 3) {
              return true;
            } else {
              router.navigate(['unauthorize']);
              return false;
            }
          })
        );
      },
    ],
    data: {
      breadcrumb: 'Schedule',
    },
  },
  {
    path: 'add',
    component: WorkScheduleFormComponent,
    canActivate: [
      () => {
        const router = inject(Router);
        return inject(AuthService).currentUser$.pipe(
          map((u) => {
            var getRole = u?.roles.find((r) => r.id)?.id;
            if (getRole === 3) {
              return true;
            } else {
              router.navigate(['unauthorize']);
              return false;
            }
          })
        );
      },
    ],
    data: {
      breadcrumb: 'Submisson',
    },
  },
  {
    path: 'review',
    component: WorkScheduleReviewComponent,
    canActivate: [
      () => {
        const router = inject(Router);
        return inject(AuthService).currentUser$.pipe(
          map((u) => {
            var getRole = u?.roles.find((r) => r.id)?.id;
            if (getRole === 2) {
              return true;
            } else {
              router.navigate(['unauthorize']);
              return false;
            }
          })
        );
      },
    ],
    data: {
      breadcrumb: 'Review',
    },
  },
];
