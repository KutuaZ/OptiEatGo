import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { addIcons } from 'ionicons';
import {
  searchOutline,
  cartOutline,
  bookmarkOutline,
  personCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule], 
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    addIcons({
      searchOutline,
      cartOutline,
      bookmarkOutline,
      personCircleOutline
    });
  }
}
