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

    // Normalizar opción
    const normalized = option.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // Obtener usuario actual
    const activeUser = localStorage.getItem('activeUser');

    // Guardar la preferencia asociada al usuario actual
    if (activeUser) {
      localStorage.setItem(`preference_${activeUser}`, normalized);
    }

    // Eliminar temas previos del body
    document.body.classList.remove('theme-vegano', 'theme-vegetariano', 'theme-omnivoro');

    // Aplicar el nuevo tema
    if (['vegano', 'vegetariano', 'omnivoro'].includes(normalized)) {
      document.body.classList.add(`theme-${normalized}`);
    }

    alert(`Preferencia seleccionada: ${option}`);
    this.router.navigateByUrl('/home');
  }
}
