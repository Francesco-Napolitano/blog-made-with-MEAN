import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  statusMessage: string = '';

  profileForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    const { email, password } = this.profileForm.value;

    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: (res: any) => {
          console.log(res);
          sessionStorage.setItem('token', res.token);
          this.statusMessage = 'Login effettuato';
          setTimeout(() => {
            this.statusMessage = '';
          }, 5000);
        },
        error: (err) => {
          console.error('Errore login', err);
        },
      });
    } else {
      console.log('Errore nel ricevimento dei dati');
    }
  }
}
