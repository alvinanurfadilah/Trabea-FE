import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.css',
})
export class MyTableComponent {
  @Input() tableData: any[] = [];
  @Input() columnArray: any[] = [];
  @Input() totalPages!: number;
  @Input() formPageNumber: any;
  @Output() getId: EventEmitter<{ action: string; id: any }> =
    new EventEmitter();

  triggerMethod(action: string, id: any): void {
    this.getId.emit({ action, id });
  }
}
