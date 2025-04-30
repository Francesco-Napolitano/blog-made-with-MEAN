import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {}
  login(credentials: { email: string; password: string }) {}
}
