import { Component, inject, OnInit } from '@angular/core';
import { JwtService } from '../auth/jwt.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  private _jwtService = inject(JwtService);
  email!: string;
  role!: string;
  getRole = this._jwtService.getRoleId();

  ngOnInit(): void {
    this.email = this._jwtService.getEmail();
    if (this.getRole == 1) {
      this.role = 'Administrator';
    }
    if (this.getRole == 2) {
      this.role = 'Manager';
    }
    if (this.getRole == 3) {
      this.role = 'Part Time Employee';
    }
  }
}
