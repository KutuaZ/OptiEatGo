import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AnimationController, MenuController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  timeOutline,
  searchOutline,
  cartOutline,
  bookmarkOutline,
  personCircleOutline,
  menuOutline,
  receiptOutline,
  logOutOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class HomePage implements OnInit {
  username = '';
  recommended = [
    { title: 'Costillar asado', description: 'Jugoso y tierno.', image: 'assets/imagen/costillarasado.jpg' },
    { title: 'Hamburguesa artesanal', description: 'Pan brioche y cheddar.', image: 'assets/imagen/hamburguesaartesanal.jpg' },
    { title: 'Pizza Pepperoni', description: 'Queso y pepperoni.', image: 'assets/imagen/pizzapeperoni.jpg' }
  ];

  constructor(private router: Router, private animationCtrl: AnimationController, private menu: MenuController) {
    addIcons({
      timeOutline,
      searchOutline,
      cartOutline,
      bookmarkOutline,
      personCircleOutline,
      menuOutline,
      receiptOutline,
      logOutOutline
    });
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('activeUser');
    this.username = storedUser || 'Usuario';
  }

  //  Guardar o quitar guardado
  saveItem(item: any) {
    let saved = JSON.parse(localStorage.getItem('savedItems') || '[]');
    const exists = saved.some((s: any) => s.title === item.title);

    if (exists) {
      saved = saved.filter((s: any) => s.title !== item.title);
    } else {
      saved.push(item);
    }

    localStorage.setItem('savedItems', JSON.stringify(saved));
  }

  //  Comprobar si está guardado
  isSaved(item: any): boolean {
    const saved = JSON.parse(localStorage.getItem('savedItems') || '[]');
    return saved.some((s: any) => s.title === item.title);
  }

  //  Animación visible
  animateCard(event: any) {
    const el = event.currentTarget.closest('ion-card');

    if (!el) return;

    const animation = this.animationCtrl
      .create()
      .addElement(el)
      .duration(400)
      .easing('ease-in-out')
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.08)', opacity: '0.85' },
        { offset: 1, transform: 'scale(1)', opacity: '1' }
      ]);

    animation.play();
  }

  goToOrders() {
    alert('Redirigiendo a tus pedidos...');
  }

  logout() {
    localStorage.removeItem('activeUser');
    document.body.classList.remove('theme-vegano', 'theme-vegetariano', 'theme-omnivoro');
    this.router.navigateByUrl('/login');
  }

  async goToReclamo() {
    // cerrar el menú antes de navegar para evitar comportamientos inesperados
    try {
      await this.menu.close();
    } catch (e) {
      // Log the error for debugging purposes; menu close errors are usually non-critical
      console.error('Error closing menu before navigating to /reclamo:', e);
    }
    this.router.navigateByUrl('/reclamo');
  }
}
