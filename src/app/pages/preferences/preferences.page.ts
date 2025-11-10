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

    // Normalizar opción (por si lleva acentos)
    const normalized = option.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // Agregar la clase correspondiente al tema
    if (['vegano', 'vegetariano', 'omnivoro'].includes(normalized)) {
      document.body.classList.add(`theme-${normalized}`);
    }

    alert(`Preferencia seleccionada: ${option}`);
    this.router.navigateByUrl('/home');
  }
}


