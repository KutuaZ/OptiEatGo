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
    if (
      !this.newUser.username ||
      !this.newUser.email ||
      !this.newUser.password ||
      !this.newUser.confirmPassword
    ) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (this.newUser.password !== this.newUser.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    alert('Cuenta creada correctamente');
    this.router.navigateByUrl('/login');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
