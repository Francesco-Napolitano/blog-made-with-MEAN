import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:5200';
  http = inject(HttpClient);

  constructor(private httpClient: HttpClient) {}
  login(email: string, password: string) {
    console.log(email, password + ' Console log del service');
    return this.http.post(`${this.url}/api/auth/login`, { email, password });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.url}/api/auth/register`, {
      name,
      email,
      password,
    });
  }
}
