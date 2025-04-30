import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    const { name, email, password } = this.profileForm.value;

    if (name && email && password) {
      this.authService.register(name, email, password).subscribe({
        next: (res: any) => {
          console.log(res);
          sessionStorage.setItem('token', res.token);
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
