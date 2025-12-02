import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Base URL for local FastAPI backend
  private readonly BASE = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  private cacheGet<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch (e) {
      return null;
    }
  }

  private cacheSet<T>(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // ignore
    }
  }

  // Example: get posts
  getPosts(): Observable<any> {
    const key = 'api_posts_cache';
    return this.http.get(`${this.BASE}/posts`).pipe(
      tap((res) => this.cacheSet(key, res)),
      catchError((err) => {
        const cached = this.cacheGet<any>(key);
        if (cached) {
          return of(cached);
        }
        return of([]);
      })
    );
  }

  // Example: get users
  getUsers(): Observable<any> {
    const key = 'api_users_cache';
    return this.http.get(`${this.BASE}/users`).pipe(
      tap((res) => this.cacheSet(key, res)),
      catchError((err) => {
        const cached = this.cacheGet<any>(key);
        if (cached) {
          return of(cached);
        }
        return of([]);
      })
    );
  }

  // Recommended items by preference (simulated if no backend exists)
  getRecommended(pref: string): Observable<any[]> {
    const key = `recommended_${pref}`;
    // Keep the local simulation as a fallback when backend is not available
    const vegano = [
      { id: 901, title: 'Ensalada Super Verde', description: 'Mezcla de hojas y quinoa', image: 'assets/imagen/fotoperfildemo.jpg', price: 4990 },
      { id: 902, title: 'Burger Veggie', description: 'Hamburguesa a base de garbanzo', image: 'assets/imagen/hamburguesaartesanal.jpg', price: 6990 },
      { id: 903, title: 'Wrap Veggie', description: 'Wrap con vegetales frescos', image: 'assets/imagen/pizzapeperoni.jpg', price: 5490 }
    ];

    const vegetariano = [
      { id: 911, title: 'Pizza Vegetariana', description: 'Mozzarella y verduras', image: 'assets/imagen/pizzapeperoni.jpg', price: 8990 },
      { id: 912, title: 'Pasta Alfredo', description: 'Salsa cremosa y champiñones', image: 'assets/imagen/hamburguesaartesanal.jpg', price: 7990 },
      { id: 913, title: 'Quiche de verduras', description: 'Tarta casera de verduras', image: 'assets/imagen/fotoperfildemo.jpg', price: 6590 }
    ];

    const omnivoro = [
      { id: 921, title: 'Costillar asado', description: 'Jugoso y tierno.', image: 'assets/imagen/costillarasado.jpg', price: 12990 },
      { id: 922, title: 'Hamburguesa artesanal', description: 'Pan brioche y cheddar.', image: 'assets/imagen/hamburguesaartesanal.jpg', price: 6990 },
      { id: 923, title: 'Pizza Pepperoni', description: 'Queso y pepperoni.', image: 'assets/imagen/pizzapeperoni.jpg', price: 8990 }
    ];

    let data: any[] = omnivoro;
    const n = (pref || '').toLowerCase();
    if (n.includes('vegano')) data = vegano;
    else if (n.includes('vegetar')) data = vegetariano;

    // cache and return as observable
    this.cacheSet(key, data);
    return of(data);
  }

  // Ask backend for recommendations by username. Falls back to local simulation on error.
  getRecommendedForUser(username: string): Observable<any[]> {
    const url = `${this.BASE}/recommended` + (username ? `?user=${encodeURIComponent(username)}` : '');
    const cacheKey = `recommended_user_${username}`;
    return this.http.get<any[]>(url).pipe(
      tap(res => this.cacheSet(cacheKey, res)),
      catchError(() => {
        const cached = this.cacheGet<any[]>(cacheKey);
        if (cached) return of(cached);
        // fallback to simulated by reading possible pref from localStorage
        const pref = localStorage.getItem(`preference_${username}`) || '';
        return this.getRecommended(pref);
      })
    );
  }

  // Generic GET with caching key optional
  getWithCache<T>(path: string, cacheKey?: string): Observable<T> {
    const key = cacheKey || `api_cache_${path}`;
    return this.http.get<T>(path).pipe(
      tap((res) => this.cacheSet(key, res)),
      catchError(() => {
        const cached = this.cacheGet<T>(key);
        if (cached) return of(cached);
        // fallback empty
        return of(null as unknown as T);
      })
    );
  }
}
