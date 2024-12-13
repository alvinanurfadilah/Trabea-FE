import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from './aside/aside.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsideComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Trabea';
  isAuth!: boolean;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.isAuthenticated$.subscribe({
      next: (isAuth) => {
        this.isAuth = isAuth;
      },
    });
  }
}
