import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage {
  newUser = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  register() {
    const { username, email, password, confirmPassword } = this.newUser;

    if (!username || !email || !password || !confirmPassword) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Obtener usuarios guardados (si existen)
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Verificar si el usuario ya existe
    if (users.find((u: any) => u.username === username)) {
      alert('El nombre de usuario ya está registrado');
      return;
    }

    // Guardar nuevo usuario
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Cuenta creada correctamente');
    this.router.navigateByUrl('/login');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
