import { Component, inject, OnInit } from '@angular/core';
import { MyTableComponent } from '../../reusable/my-table/my-table.component';
import { PartTimeEmployeesService } from '../part-time-employees.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PartTimeEmployee } from '../part-time-employees.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-part-time-employee-list',
  standalone: true,
  imports: [MyTableComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './part-time-employee-list.component.html',
  styleUrl: './part-time-employee-list.component.css',
})
export class PartTimeEmployeeListComponent implements OnInit {
  isLoading: boolean = true;
  private _route = inject(ActivatedRoute);
  private _partTimeEmployeeService = inject(PartTimeEmployeesService);
  private _router = inject(Router);
  partTimeEmployees: PartTimeEmployee[] = [];
  totalPages!: number;
  totalRows!: number;

  columnArray: any[] = [
    { header: 'Action', fieldName: 'id', dataType: 'string' },
    { header: 'Name', fieldName: 'fullName', dataType: 'string' },
    {
      header: 'Personal Email',
      fieldName: 'personalEmail',
      dataType: 'string',
    },
    { header: 'Work Email', fieldName: 'workEmail', dataType: 'string' },
    {
      header: 'Phone Number',
      fieldName: 'personalPhoneNumber',
      dataType: 'string',
    },
    { header: 'Joined Since', fieldName: 'joinDate', dataType: 'Date' },
  ];

  filterForm = new FormGroup({
    fullName: new FormControl<string | null>(''),
    pageNumber: new FormControl<number>(1),
  });

  ngOnInit(): void {
    this.loadPartTimeEmployeeWithParams();
  }

  onSubmit() {
    const queryParams = {
      fullName: this.filterForm.value.fullName || null,
      pageNumber: 1,
    };

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  loadPartTimeEmployee() {
    this.isLoading = true;
    const queryParams = this._route.snapshot.queryParams;

    this._partTimeEmployeeService
      .getAllPartTimeEmployee(queryParams)
      .subscribe((partTimeEmployee) => {
        this.partTimeEmployees = partTimeEmployee.partTimeEmployees;
        this.totalPages = partTimeEmployee.pagination.totalPages;
        this.totalRows = partTimeEmployee.pagination.totalRows;
        this.isLoading = false;
      });
  }

  loadPartTimeEmployeeWithParams() {
    this._route.queryParams.subscribe((params) => {
      this.filterForm.patchValue(
        {
          fullName: params['fullName'] || null,
          pageNumber: +params['pageNumber'] || 1,
        },
        {
          emitEvent: false,
        }
      );
      this.loadPartTimeEmployee();
    });
  }
}
