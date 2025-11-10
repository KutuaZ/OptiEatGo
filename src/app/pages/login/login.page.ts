import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  user = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  login() {
    const { username, password } = this.user;

    if (!username || !password) {
      alert('Por favor completa los campos.');
      return;
    }

    if (username.length < 3 || username.length > 8) {
      alert('El usuario debe tener entre 3 y 8 caracteres.');
      return;
    }

    if (!/^[0-9]{4}$/.test(password)) {
      alert('La contraseña debe tener exactamente 4 dígitos numéricos.');
      return;
    }

    // Recuperar usuarios registrados
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Buscar usuario
    const found = users.find((u: any) => u.username === username && u.password === password);

    if (!found) {
      alert('Usuario o contraseña incorrectos.');
      return;
    }

    // Guardar sesión activa
    localStorage.setItem('activeUser', username);

    // Ir a preferencias
    this.router.navigateByUrl('/preferences');
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
