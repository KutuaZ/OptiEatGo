import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SavedPage implements OnInit {
  savedItems: any[] = [];

  constructor(private router: Router) {
    addIcons({ closeOutline });
  }

  ngOnInit() {
    this.loadSaved();
  }

  ionViewWillEnter() {
    this.loadSaved();
  }

  loadSaved() {
    this.savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
  }

  close() {
    this.router.navigate(['/home']);
  }
}
