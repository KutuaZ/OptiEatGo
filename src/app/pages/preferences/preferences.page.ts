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
    localStorage.setItem('preference', option);

    // Eliminar temas previos del body
    document.body.classList.remove('theme-vegano', 'theme-vegetariano', 'theme-omnivoro');

    // Agregar el nuevo tema
    switch (option) {
      case 'vegano':
        document.body.classList.add('theme-vegano');
        break;
      case 'vegetariano':
        document.body.classList.add('theme-vegetariano');
        break;
      case 'omnívoro':
        document.body.classList.add('theme-omnivoro');
        break;
      default:
        break;
    }

    alert(`Preferencia seleccionada: ${option}`);
    this.router.navigateByUrl('/home');
  }
}

