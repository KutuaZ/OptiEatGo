import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class HomePage {
  username: string = '';
  activeTab = 'home';
  constructor(private router: Router) {}
  
  
  goTo(page: string) {
    this.activeTab = page;
    this.router.navigateByUrl(`/${page}`);
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    this.username = storedUser ? storedUser : 'Invitado';
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  goToCart() {
    this.router.navigateByUrl('/cart');
  }

  goToSaved() {
    this.router.navigateByUrl('/saved');
  }
}


