
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { usuarioModel } from '../../models/userModel';
import { UsuarioService } from '../../services/usuario-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  registroForm: FormGroup;
  errorMensaje: string = '';
  exitoMensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
  if (this.registroForm.valid) {
    const nuevoUsuario: usuarioModel = {
      ...this.registroForm.value,
      id_usuario: 0,
      roles: ['USER']
    };

    this.usuarioService.registro(nuevoUsuario).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Serás redirigido al login',
          timer: 2000,
          showConfirmButton: false
        });

        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        const mensajeError = err.error?.error || 'Error desconocido';

        Swal.fire({
          icon: 'warning',
          title: 'Error al registrar',
          text: mensajeError,
          confirmButtonText: 'OK'
        });
      }
    });
  } else {
    Swal.fire({
      icon: 'info',
      title: 'Campos incompletos',
      text: 'Por favor llena todos los campos correctamente.',
      confirmButtonText: 'Entendido'
    });
  }
}




}
