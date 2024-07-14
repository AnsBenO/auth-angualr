import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { AuthResponse, LoginBody, RegisterBody, User } from '../types/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiLink = 'https://api.realworld.io/api';

  http = inject(HttpClient);
  currentUser: WritableSignal<User | undefined | null> = signal(undefined);

  login(formData: LoginBody): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiLink}/users/login`, {
      user: formData,
    });
  }

  register(formData: RegisterBody): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiLink}/users`, {
      user: formData,
    });
  }

  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getUser() {
    return this.http.get<{ user: User }>(`${this.apiLink}/user`);
  }

  logout(): void {
    localStorage.setItem('authToken', '');
    this.currentUser.set(null);
  }
}
