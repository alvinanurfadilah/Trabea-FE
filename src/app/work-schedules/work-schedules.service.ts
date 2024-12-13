import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../app.config';
import {
  ShiftDropdown,
  WorkSchedule,
  WorkScheduleInsert,
  WorkScheduleIndex,
  WorkScheduleReviewIndex,
  WorkScheduleUpdate,
} from './work-schedules.model';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WorkSchedulesService {
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/work-schedule`;

  getDropdownShift(): Observable<ShiftDropdown[]> {
    return this._http.get<ShiftDropdown[]>(`${this._apiUrl}/shift-dropdown`);
  }

  getAllWorkSchedule(weekNumber: number) {
    return this._http.get<WorkScheduleIndex[]>(`${this._apiUrl}/${weekNumber}`);
  }

  getAllWorkScheduleReview(
    params: Params
  ): Observable<WorkScheduleReviewIndex> {
    const activatedParams = Object.keys(params)
      .filter((key) => params[key] !== null)
      .reduce<Params>((activeParams, paramName) => {
        activeParams[paramName] = params[paramName];
        return activeParams;
      }, {});

    return this._http.get<WorkScheduleReviewIndex>(`${this._apiUrl}/review`, {
      params: activatedParams,
    });
  }

  insertWorkSchedule(formData: WorkScheduleInsert): Observable<WorkSchedule> {
    return this._http.post<WorkSchedule>(this._apiUrl, formData);
  }

  updateWorkSchedule(
    id: number,
    formData: WorkScheduleUpdate
  ): Observable<WorkSchedule> {
    return this._http.put<WorkSchedule>(`${this._apiUrl}/${id}`, formData);
  }
}
