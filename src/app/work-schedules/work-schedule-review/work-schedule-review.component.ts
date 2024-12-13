import { Component, inject, OnInit } from '@angular/core';
import { WorkSchedulesService } from '../work-schedules.service';
import {
  ShiftDropdown,
  WorkScheduleReview,
  WorkScheduleUpdate,
} from '../work-schedules.model';
import { MyTableComponent } from '../../reusable/my-table/my-table.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-work-schedule-review',
  standalone: true,
  imports: [MyTableComponent, ReactiveFormsModule],
  templateUrl: './work-schedule-review.component.html',
  styleUrl: './work-schedule-review.component.css',
})
export class WorkScheduleReviewComponent implements OnInit {
  isLoading: boolean = true;
  private _workScheduleService = inject(WorkSchedulesService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  workScheduleReview: WorkScheduleReview[] = [];
  totalPages!: number;
  totalRows!: number;
  shiftDropdown!: ShiftDropdown[];

  columnArray: any[] = [
    { header: 'Name', fieldName: 'name', dataType: 'string' },
    {
      header: 'Proposed Date',
      fieldName: 'proposedDate',
      dataType: 'string',
    },
    { header: 'Shift', fieldName: 'shift', dataType: 'string' },
    { header: 'Approval', fieldName: 'id', dataType: 'string' },
  ];

  filterForm = new FormGroup({
    name: new FormControl<string | null>(''),
    shiftId: new FormControl<string | null>(''),
    startDate: new FormControl<string | null>(''),
    endDate: new FormControl<string | null>(''),
    pageNumber: new FormControl<number>(1),
  });

  formUpdate: WorkScheduleUpdate = {
    id: 0,
    isApproved: true,
  };

  ngOnInit(): void {
    this.loadWorkScheduleReviewWithParams();

    this._workScheduleService
      .getDropdownShift()
      .subscribe((shift) => (this.shiftDropdown = shift));
  }

  onSubmit() {
    const queryParams = {
      name: this.filterForm.value.name || null,
      shiftId: this.filterForm.value.shiftId || null,
      startDate: this.filterForm.value.startDate || null,
      endDate: this.filterForm.value.endDate || null,
      pageNumber: 1,
    };

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  loadWorkScheduleReview() {
    this.isLoading = true;
    const queryParams = this._route.snapshot.queryParams;

    this._workScheduleService
      .getAllWorkScheduleReview(queryParams)
      .subscribe((ws) => {
        this.workScheduleReview = ws.reviews;
        this.totalPages = ws.pagination.totalPages;
        this.totalRows = ws.pagination.totalRows;
        this.isLoading = false;
      });
  }

  loadWorkScheduleReviewWithParams() {
    this._route.queryParams.subscribe((params) => {
      this.filterForm.patchValue(
        {
          name: params['name'] || null,
          shiftId: params['shiftId'] || '',
          startDate: params['startDate'] || null,
          endDate: params['endDate'] || null,
          pageNumber: +params['pageNumber'] || 1,
        },
        {
          emitEvent: false,
        }
      );
      this.loadWorkScheduleReview();
    });
  }

  approvalYes(id: number) {
    this.formUpdate.id = id;
    this.formUpdate.isApproved = true;
    this._workScheduleService
      .updateWorkSchedule(id, this.formUpdate)
      .subscribe(() => {
        this.loadWorkScheduleReview();
      });
  }

  approvalNo(id: number) {
    this.formUpdate.id = id;
    this.formUpdate.isApproved = false;
    this._workScheduleService
      .updateWorkSchedule(id, this.formUpdate)
      .subscribe(() => {
        this.loadWorkScheduleReview();
      });
  }

  handleApproval(action: string, id: number) {
    if (action == 'yes') {
      window.confirm('You are about to approve it. Are you sure?');
      this.approvalYes(id);
    } else {
      window.confirm('You are about to reject it. Are you sure?');
      this.approvalNo(id);
    }
  }
}
