import { Pagination } from '../pagination';

export interface WorkSchedule {
  shiftId: number;
  partTimeEmployeeId?: number;
  partTimeEmployee: string;
}

export interface WorkScheduleIndex {
  workDate: Date;
  shifts: WorkSchedule[];
}

export interface WorkScheduleReview {
  name: string;
  proposedDate: string;
  shift: string;
}

export interface WorkScheduleReviewIndex {
  reviews: WorkScheduleReview[];
  pagination: Pagination;
  name: string;
  shiftId: number;
  startDate: Date;
  endDate: Date;
}

export interface WorkScheduleInsert {
  workDate: Date;
  shiftId: number;
}

export interface WorkScheduleUpdate {
  id: number;
  isApproved: Boolean;
}

export interface ShiftDropdown {
  text: string;
  value: string;
}
