import { inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  EducationDropdown,
  PartTimeEmployee,
  PartTimeEmployeeIndex,
  PartTimeEmployeeInsert,
  PartTimeEmployeeResponse,
  PartTimeEmployeeUpdate,
} from './part-time-employees.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class PartTimeEmployeesService {
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/part-time-employee`;
  private _partTimeEmployeeSubject = new BehaviorSubject<PartTimeEmployee[]>(
    []
  );

  getDropdownEducation(): Observable<EducationDropdown[]> {
    return this._http.get<EducationDropdown[]>(
      `${this._apiUrl}/education-dropdown`
    );
  }

  getAllPartTimeEmployee(params: Params): Observable<PartTimeEmployeeIndex> {
    const activatedParams = Object.keys(params)
      .filter((key) => params[key] !== null)
      .reduce<Params>((activeParams, paramName) => {
        activeParams[paramName] = params[paramName];
        return activeParams;
      }, {});

    return this._http.get<PartTimeEmployeeIndex>(this._apiUrl, {
      params: activatedParams,
    });
  }

  getByIdPartTimeEmployee(id: number): Observable<PartTimeEmployeeResponse> {
    return this._http.get<PartTimeEmployeeResponse>(`${this._apiUrl}/${id}`);
  }

  insertPartTimeEmployee(
    formData: PartTimeEmployeeInsert
  ): Observable<PartTimeEmployee> {
    return this._http
      .post<PartTimeEmployee>(this._apiUrl, formData)
      .pipe(
        tap((ptEmp) =>
          this._partTimeEmployeeSubject.next([
            ...this._partTimeEmployeeSubject.getValue(),
            ptEmp,
          ])
        )
      );
  }

  updatePartTimeEmployee(
    id: number,
    formData: PartTimeEmployeeUpdate
  ): Observable<PartTimeEmployee> {
    return this._http.put<PartTimeEmployee>(`${this._apiUrl}/${id}`, formData);
  }
}
