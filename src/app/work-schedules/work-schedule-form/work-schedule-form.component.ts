import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WorkSchedulesService } from '../work-schedules.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShiftDropdown, WorkScheduleInsert } from '../work-schedules.model';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-work-schedule-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePipe,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ],
  templateUrl: './work-schedule-form.component.html',
  styleUrl: './work-schedule-form.component.css',
})
export class WorkScheduleFormComponent implements OnInit {
  private _workScheduleService = inject(WorkSchedulesService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  shiftDropdown!: ShiftDropdown[];
  eligibleStartDate!: Date;
  eligibleEndDate!: Date;

  formInsert = new FormGroup({
    workDate: new FormControl<Date>(new Date(), {
      validators: [Validators.required],
    }),
    shiftId: new FormControl<number>(0, {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    var today = new Date();
    var nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7));
    var nextFriday = new Date(nextMonday);
    nextFriday.setDate(nextMonday.getDate() + 4);
    this.eligibleStartDate = nextMonday;
    this.eligibleEndDate = nextFriday;
  }

  onSubmit() {
    if (this.formInsert.valid) {
      this._workScheduleService
        .insertWorkSchedule(this.formInsert.value as WorkScheduleInsert)
        .subscribe({
          next: () => {
            this._router.navigate(['../'], {
              relativeTo: this._route,
            });
          },
        });
    }
  }

  getDate(event: Event) {
    var getValue = (event.target as HTMLInputElement).value;

    this._workScheduleService.getDropdownShift().subscribe({
      next: (shift) => {
        this._workScheduleService.getAllWorkSchedule(2).subscribe({
          next: (ws) => {
            var usedShiftId = new Set<String>();
            ws.forEach((work) => {
              if (work.workDate.toString().split('T')[0] === getValue) {
                work.shifts.forEach((s) => {
                  if (s != null) {
                    usedShiftId.add(s.shiftId.toString());
                  }
                });
              }
            });
            this.shiftDropdown = shift.filter((s) => !usedShiftId.has(s.value));
          },
        });
      },
    });
  }
}
