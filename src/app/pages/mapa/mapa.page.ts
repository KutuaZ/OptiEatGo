import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, CommonModule, FormsModule]
})
export class MapaPage {


  private map?: L.Map;

  constructor(private router: Router) {
    // Registrar el icono para que se muestre correctamente
    try { addIcons({ closeOutline }); } catch (e) { /* no crítico si falla */ }
  }

  close() {
    this.router.navigate(['/home']);
  }

  async ionViewDidEnter() {
    await this.cargarMapa();
  }

  private async cargarMapa() {

    try {
      const position = await Geolocation.getCurrentPosition({
        timeout: 10000,
        enableHighAccuracy: true
      });

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log('Ubicación obtenida:', lat, lng);

      // Si el mapa ya existe, simplemente centramos y salimos
      if (this.map) {
        this.map.setView([lat, lng], 16);
        return;
      }

      // Crear mapa por primera vez
      this.map = L.map('map', {
        center: [lat, lng],
        zoom: 16
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      }).addTo(this.map!);

      L.marker([lat, lng]).addTo(this.map!)
        .bindPopup('¡Aquí estás!')
        .openPopup();

    }catch (error) {
      console.error('Error obteniendo la ubicación:', error);
    }
  }

}