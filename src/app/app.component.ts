import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { addIcons } from 'ionicons';
import {
  searchOutline,
  cartOutline,
  bookmarkOutline,
  personCircleOutline,
  menuOutline,
  timeOutline
} from 'ionicons/icons';
import { LoadingComponent } from './components/loading/loading.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, LoadingComponent],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loading = false; // controla la visibilidad del loader

  constructor() {
    addIcons({
      searchOutline,
      cartOutline,
      bookmarkOutline,
      personCircleOutline,
      menuOutline,
      timeOutline
    });
  }

  //  Se ejecuta cuando la navegación inicia
  showLoader() {
    this.loading = true;
  }

  //  Se ejecuta cuando termina la navegación
  hideLoader() {
    setTimeout(() => (this.loading = false), 400); // ajustar el tiempo
  }
}

