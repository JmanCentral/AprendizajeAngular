import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginModel } from '../models/loginModel';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8862/Finanzapp';

  constructor(private http: HttpClient) {}

  login(credentials: loginModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  guardarToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('authToken');
  }

  eliminarToken(): void {
    localStorage.removeItem('authToken');
  }


}
