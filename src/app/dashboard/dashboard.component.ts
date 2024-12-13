import { Component, inject, OnInit } from '@angular/core';
import { JwtService } from '../auth/jwt.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  private _jwtService = inject(JwtService);

  fullName!: string;

  ngOnInit(): void {
    this.fullName = this._jwtService.getFullName();
  }
}
