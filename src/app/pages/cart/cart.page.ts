import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CartPage {
  items: any[] = [];

  constructor(private router: Router, public cart: CartService) {
    try { addIcons({ closeOutline }); } catch (e) { }
    this.load();
  }

  formatCLP(amount: number) {
    try {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount || 0);
    } catch (e) {
      return `$ ${Math.round(amount || 0)}`;
    }
  }

  load() {
    this.items = this.cart.getItems();
  }

  remove(index: number) {
    this.cart.removeItem(index);
    this.load();
  }

  updateQty(index: number, ev: any) {
    const v = Number(ev?.detail?.value ?? ev?.target?.value ?? 1) || 1;
    this.cart.updateQty(index, v);
    this.load();
  }

  clear() {
    this.cart.clear();
    this.load();
  }

  checkout() {
    if (!this.items.length) {
      alert('El carrito está vacío.');
      return;
    }
    const total = this.cart.getTotal();
    alert(`Compra simulada — total: ${this.formatCLP(total)}`);
    this.clear();
  }

  addSampleItems() {
    const samples = [
      { id: 301, title: 'Hamburguesa clásica', price: 5990, qty: 1, image: 'assets/imagen/hamburguesaartesanal.jpg' },
      { id: 302, title: 'Papas fritas', price: 1990, qty: 1, image: 'assets/imagen/papasfritas.jpg' },
      { id: 303, title: 'Refresco', price: 990, qty: 1, image: 'assets/imagen/refresco.jpg' }
    ];
    samples.forEach(s => this.cart.addItem(s));
    this.load();
  }

  close() {
    this.router.navigate(['/home']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
