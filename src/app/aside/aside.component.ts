import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { JwtService } from '../auth/jwt.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css',
})
export class AsideComponent implements OnInit {
  private _jwtService = inject(JwtService);
  roleId!: number;

  ngOnInit(): void {
    var getRoleId = this._jwtService.getRoleId();
    this.roleId = getRoleId;
  }
}
