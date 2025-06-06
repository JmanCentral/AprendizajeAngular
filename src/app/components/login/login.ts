import { Component } from '@angular/core';
import { loginModel } from '../../models/loginModel';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { LoginResponse } from '../../models/loginResponse';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone : true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})


export class Login {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService , private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  onLogin() {
  if (this.loginForm.valid) {
    const credentials: loginModel = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response: LoginResponse) => {
        console.log('Respuesta del backend:', response);

        this.authService.guardarToken(response.token);

        // ✅ Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: `¡Bienvenido, ${response.nombre}!`,
          timer: 1500,
          showConfirmButton: false
        });

        // Redireccionar al dashboard después de un breve delay
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);

        const mensajeError = err.error?.error || 'Error desconocido al iniciar sesión.';

        // ✅ Mostrar mensaje de error del backend
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: mensajeError,
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    });
  } else {
    // ✅ Si los campos están vacíos
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos',
      text: 'Por favor, ingrese su usuario y contraseña.',
      confirmButtonText: 'Ok'
    });
  }
}


  onRegister() {
    // ✅ Redireccionar a la ruta de registro
    this.router.navigate(['/registro']);
  }

}
