import { Component, inject, Input, OnInit } from '@angular/core';
import { PartTimeEmployeesService } from '../part-time-employees.service';
import {
  EducationDropdown,
  PartTimeEmployeeInsert,
  PartTimeEmployeeUpdate,
} from '../part-time-employees.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-part-time-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './part-time-employee-form.component.html',
  styleUrl: './part-time-employee-form.component.css',
})
export class PartTimeEmployeeFormComponent implements OnInit {
  @Input({ required: true }) id!: number;
  private _partTimeEmployeeService = inject(PartTimeEmployeesService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  educationDropdown!: EducationDropdown[];

  formInsert = new FormGroup({
    firstName: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl<string | null>(null),
    personalEmail: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    personalPhoneNumber: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    address: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    lastEducation: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    onGoingEducation: new FormControl<string | null>(null),
  });

  formUpdate: PartTimeEmployeeUpdate = {
    id: this.id,
    firstName: '',
    lastName: '',
    personalEmail: '',
    personalPhoneNumber: '',
    lastEducation: '',
    address: '',
    onGoingEducation: '',
  };

  ngOnInit(): void {
    if (this.id) {
      this._partTimeEmployeeService.getByIdPartTimeEmployee(this.id).subscribe({
        next: (ptEmp) => {
          this.formInsert.controls.firstName.setValue(ptEmp.firstName);
          this.formInsert.controls.lastName.setValue(ptEmp.lastName);
          this.formInsert.controls.personalEmail.setValue(ptEmp.personalEmail);
          this.formInsert.controls.personalPhoneNumber.setValue(
            ptEmp.personalPhoneNumber
          );
          this.formInsert.controls.address.setValue(ptEmp.address);
          this.formInsert.controls.lastEducation.setValue(ptEmp.lastEducation);
          this.formInsert.controls.onGoingEducation.setValue(
            ptEmp.onGoingEducation
          );
        },
      });
    }

    this._partTimeEmployeeService
      .getDropdownEducation()
      .subscribe((edu) => (this.educationDropdown = edu));
  }

  onSubmit() {
    if (this.formInsert.valid) {
      if (this.id) {
        this.formUpdate.id = this.id;
        this.formUpdate.firstName = this.formInsert.value.firstName!;
        this.formUpdate.lastName = this.formInsert.value.lastName!;
        this.formUpdate.personalEmail = this.formInsert.value.personalEmail!;
        this.formUpdate.personalPhoneNumber =
          this.formInsert.value.personalPhoneNumber!;
        this.formUpdate.address = this.formInsert.value.address!;
        this.formUpdate.lastEducation = this.formInsert.value.lastEducation!;
        this.formUpdate.onGoingEducation =
          this.formInsert.value.onGoingEducation!;

        this._partTimeEmployeeService
          .updatePartTimeEmployee(this.id, this.formUpdate)
          .subscribe(() => {
            this._router.navigate(['../../'], { relativeTo: this._route });
          });
      } else {
        this._partTimeEmployeeService
          .insertPartTimeEmployee(
            this.formInsert.value as PartTimeEmployeeInsert
          )
          .subscribe({
            next: () => {
              this._router.navigate(['../'], { relativeTo: this._route });
            },
          });
      }
    }
  }
}
