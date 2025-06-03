import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:5200';
  http = inject(HttpClient);
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    JSON.parse(sessionStorage.getItem('user') || ' {}')
  );

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.url}/api/auth/login`, { email, password })
      .pipe(
        tap((user) => {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.url}/api/auth/register`, {
      name,
      email,
      password,
    });
  }

  isAuthenticated(): boolean {
    const user = this.userSubject.value;
    console.log('PROVA USER', user); // il valore di userSubject è un OGGETTO che contiene il token riportato dal BACKEND
    return user && user.token ? true : false;
  }

  getUserRole(): boolean {
    const token = sessionStorage.getItem('token');
    console.log("COS'è??", token);
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); //questo valore restituisce il payload con all'interno le informazioni del token
      //                                                             come il role, exp_date ecc.
      console.log("COS'è (PT.2)", payload.role);
      if (payload.role == 'ADMIN' || payload.role == 'AUTHOR') {
        return true;
      } else return false;
    }
    return false;
  }
}
