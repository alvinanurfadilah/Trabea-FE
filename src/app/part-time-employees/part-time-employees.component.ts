import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyTableComponent } from "../reusable/my-table/my-table.component";
import { PartTimeEmployeeListComponent } from './part-time-employee-list/part-time-employee-list.component';
import { BreadcrumbComponent } from 'xng-breadcrumb';

@Component({
  selector: 'app-part-time-employees',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './part-time-employees.component.html',
  styleUrl: './part-time-employees.component.css'
})
export class PartTimeEmployeesComponent {
  
}
