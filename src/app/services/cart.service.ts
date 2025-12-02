import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'optieat_cart';
  private items: Array<any> = [];

  constructor() {
    try {
      this.items = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch (e) {
      this.items = [];
    }
  }

  private persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  getItems() {
    return this.items.slice();
  }

  addItem(item: any) {
    if (item && item.id != null) {
      const found = this.items.find(i => i.id === item.id);
      if (found) {
        found.qty = (found.qty || 1) + (item.qty || 1);
        this.persist();
        return;
      }
    }
    this.items.push({ ...item, qty: item.qty || 1 });
    this.persist();
  }

  removeItem(index: number) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
      this.persist();
    }
  }

  updateQty(index: number, qty: number) {
    if (index >= 0 && index < this.items.length) {
      this.items[index].qty = Math.max(1, Math.floor(qty));
      this.persist();
    }
  }

  clear() {
    this.items = [];
    this.persist();
  }

  getTotal() {
    return this.items.reduce((s, it) => s + ((it.price || 0) * (it.qty || 1)), 0);
  }
}
