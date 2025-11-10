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
    if (this.user.username === 'test' && this.user.password === '1234') {
      alert('Inicio de sesión exitoso');
      this.router.navigateByUrl('/home');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}