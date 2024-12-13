import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WorkSchedulesService } from '../work-schedules.service';
import { WorkScheduleIndex } from '../work-schedules.model';
import { DatePipe } from '@angular/common';
import { PartTimeEmployeesService } from '../../part-time-employees/part-time-employees.service';
import { PartTimeEmployeeResponse } from '../../part-time-employees/part-time-employees.model';
import { JwtService } from '../../auth/jwt.service';

declare var bootstrap: any;

@Component({
  selector: 'app-work-schedule-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './work-schedule-list.component.html',
  styleUrl: './work-schedule-list.component.css',
})
export class WorkScheduleListComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef<HTMLDivElement>;
  private _workScheduleService = inject(WorkSchedulesService);
  private _partTimeEmployeeService = inject(PartTimeEmployeesService);
  private _jwtService = inject(JwtService);
  workSchedules!: WorkScheduleIndex[];
  currentWeek: number = 1;
  startDate!: Date;
  endDate!: Date;
  partTimeEmployee?: PartTimeEmployeeResponse;
  buttonNext: boolean = true;
  
  ngOnInit(): void {
    this.loadWorkSchedule();
  }

  calculateWeekDates() {
    var today = new Date();
    var firstDayOfWeek = new Date(
      today.setDate(
        today.getDate() - today.getDay() + 1 + 7 * (this.currentWeek - 1)
      )
    );
    var lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 4));
    this.startDate = firstDayOfWeek;
    this.endDate = lastDayOfWeek;
  }

  loadWorkSchedule() {
    this._workScheduleService
      .getAllWorkSchedule(this.currentWeek)
      .subscribe((workSchedule) => {
        this.workSchedules = workSchedule;
        
        this.calculateWeekDates();
      });
  }

  nextWeek() {
    if (this.buttonNext) {
      this.currentWeek++;
      this.buttonNext = false;
    } else {
      this.currentWeek--;
      this.buttonNext = true;
    }
    this.loadWorkSchedule();
  }

  openModal(id?: number): void {
    if (this.myModal) {
      if (this._jwtService.getRoleId() == 2) {
        if (id) {
          this._partTimeEmployeeService.getByIdPartTimeEmployee(id!).subscribe({
            next: (ptEmp) => {
              this.partTimeEmployee = ptEmp;
            },
          });
        } else {
          this.partTimeEmployee = undefined;
        }

        var myModal = new bootstrap.Modal(this.myModal.nativeElement, {});
        myModal.show();
      }
    }
  }
}
