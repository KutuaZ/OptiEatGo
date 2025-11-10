import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon,
  IonList, IonItem, IonLabel, IonAvatar, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personOutline, notificationsOutline, locationOutline, 
  heartOutline, settingsOutline, closeOutline, cardOutline, colorPaletteOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon,
    IonList, IonItem, IonLabel, IonAvatar, IonButtons
  ]
})
export class ProfilePage implements OnInit {
  user = {
    name: '',
    status: 'Usuario activo',
    points: 0,
    avatar: 'assets/avatar.png'
  };

  menuOptions = [
    { icon: 'person-outline', label: 'Información personal', action: 'personal-info' },
    { icon: 'notifications-outline', label: 'Notificaciones', action: 'notifications' },
    { icon: 'location-outline', label: 'Dirección Restaurante', action: 'location' },
    { icon: 'heart-outline', label: 'Guardados', action: 'favorites' },
    { icon: 'color-palette-outline', label: 'Cambiar preferencia de alimentación', action: 'preferences' }, // 🔹 NUEVO
    { icon: 'settings-outline', label: 'Ajustes', 
      action: 'settings',
      subtitle: 'Soporte técnico, privacidad y términos de uso'
    }
  ];

  constructor(private router: Router) {
    addIcons({ 
      personOutline, notificationsOutline, locationOutline, 
      heartOutline, settingsOutline, closeOutline, cardOutline, colorPaletteOutline
    });
  }

  ngOnInit() {
    const activeUser = localStorage.getItem('activeUser');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find((u: any) => u.username === activeUser);

    if (found) {
      this.user.name = found.username;
      this.user.points = Math.floor(Math.random() * 7000) + 1000;
    } else {
      this.user.name = 'Invitado';
    }
  }

  onMenuClick(action: string) {
    if (action === 'preferences') {
      this.router.navigate(['/preferences']); //  redirige a la página de preferencias
      return;
    }

    console.log('Menu action:', action);
  }

  close() {
    this.router.navigate(['/home']);
  }
}
