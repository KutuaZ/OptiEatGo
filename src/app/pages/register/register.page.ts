import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class RegisterPage {
  newUser: { username: string; email: string; password: string; confirmPassword: string; preference: string } = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    preference: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

  register(): void {
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
    const users: any[] = JSON.parse(localStorage.getItem('users') || '[]');

    // Verificar si el usuario ya existe localmente
    if (users.find((u: any) => u.username === username)) {
      alert('El nombre de usuario ya está registrado');
      return;
    }

    const payload = {
      username,
      email,
      password,
      preference: this.newUser.preference || ''
    };

    const base = 'http://localhost:8000';
    this.http.post<any>(`${base}/register`, payload).subscribe({
      next: (res: any) => {
        if (res && res.token) {
          localStorage.setItem('optieat_token', res.token);
        }
        localStorage.setItem('activeUser', username);
        if (payload.preference) {
          // normalize preference: remove accents, spaces, lowercase
          let normalized = payload.preference
            ? payload.preference.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '')
            : '';
          if (normalized) {
            try { localStorage.setItem(`preference_${username}`, normalized); } catch (e) {}
            document.body.classList.remove('theme-vegano', 'theme-vegetariana', 'theme-omnivoro');
            document.body.classList.add(`theme-${normalized}`);
          }
        }
        alert('Cuenta creada y sesión iniciada');
        this.router.navigateByUrl('/home');
      },
      error: (err: any) => {
        console.warn('Backend register failed, falling back to localStorage', err);
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        if (this.newUser.preference) {
          const normalized = this.newUser.preference.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '');
          try { localStorage.setItem(`preference_${username}`, normalized); } catch (e) {}
          document.body.classList.remove('theme-vegano', 'theme-vegetariana', 'theme-omnivoro');
          if (normalized) document.body.classList.add(`theme-${normalized}`);
        }
        alert('Cuenta creada (modo offline). Inicia sesión para continuar');
        this.router.navigateByUrl('/login');
      }
    });
  }

  goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
