import { Injectable } from '@angular/core';
import { usuarioModel } from '../models/userModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    private baseUrl = 'http://localhost:8862/Finanzapp';

     constructor(private http: HttpClient) {}

     registro(registro: usuarioModel): Observable<any> {
         return this.http.post(`${this.baseUrl}/registro`, registro);
       }

}
