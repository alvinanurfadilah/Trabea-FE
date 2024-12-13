import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthRequest, RoleDropdown } from '../auth.model';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _jwtService = inject(JwtService);
  roleDropdown: RoleDropdown[] = [];

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
    roleId: new FormControl(0),
  });

  ngOnInit(): void {
    this._authService.getRoleDropdown().subscribe((role) => {
      this.roleDropdown = role;
    });
  }

  onSubmit() {
    this._authService.login(this.form.value as AuthRequest).subscribe({
      next: () => {
        this._router.navigate(['dashboard']);
        this._jwtService.setRoleId(this.form.value.roleId!);
      },
      error: () => {
        window.alert('Email or Password or Role is invalid!');
      },
    });
  }
}
