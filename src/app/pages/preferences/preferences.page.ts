import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PreferencesPage {
  selectedPreference: string = '';

  constructor(private router: Router) {}

  selectPreference(option: string) {
    this.selectedPreference = option;

    // Guardar preferencia en localStorage para mantenerla en la app
    localStorage.setItem('preference', option);

    // Cambiar color del tema según elección
    let color;
    switch (option) {
      case 'vegano':
        color = '#00C853'; // verde fuerte
        break;
      case 'vegetariano':
        color = '#AEEA00'; // verde limón
        break;
      case 'omnívoro':
        color = '#FFFFFF'; // blanco base
        break;
      default:
        color = '#1976D2'; // azul base
    }
    document.body.style.backgroundColor = color;

    // Luego de seleccionar, ir al home
    alert(`Preferencia seleccionada: ${option}`);
    this.router.navigateByUrl('/home');
  }
}

