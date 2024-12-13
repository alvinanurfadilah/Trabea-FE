import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from 'xng-breadcrumb';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BreadcrumbComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private _authService = inject(AuthService);

  onLogout() {
    this._authService.logout();
  }
}
