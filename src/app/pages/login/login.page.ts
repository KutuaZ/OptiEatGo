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
    if (!this.user.username || !this.user.password) {
      alert('Por favor completa los campos.');
      return;
    }

    if (this.user.username.length < 3 || this.user.username.length > 8) {
      alert('El usuario debe tener entre 3 y 8 caracteres.');
      return;
    }

    if (!/^[0-9]{4}$/.test(this.user.password)) {
      alert('La contraseña debe tener exactamente 4 dígitos numéricos.');
      return;
    }

    localStorage.setItem('user', this.user.username);

    // Ir a preferencias tras login
    this.router.navigateByUrl('/preferences');
  }

  // registrar usuario
  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
