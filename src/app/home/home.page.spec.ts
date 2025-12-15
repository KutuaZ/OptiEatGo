import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuController, AnimationController, NavController, Platform } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';

class ApiServiceMock {
  getRecommendedForUser() { return of([]); }
  getPosts() { return of([]); }
  clearRecommendedCache() {}
}

class CartServiceMock {
  private items: any[] = [];
  addItem(item: any) { this.items.push(item); }
  getItems() { return this.items; }
}

// Minimal stub for AnimationController to avoid runtime errors
const animationCtrlStub = {
  create: () => ({
    addElement() { return this; },
    duration() { return this; },
    easing() { return this; },
    keyframes() { return this; },
    play() {}
  })
};

// Platform y NavController stubs para evitar dependencias de back button
const platformStub: Partial<Platform> = {
  backButton: {
    subscribeWithPriority: (_p: number, _fn: any) => ({ unsubscribe() {} }),
    subscribe: (_fn: any) => ({ unsubscribe() {} }),
  } as any,
  // Debe devolver Promise<string> según la interfaz de Platform
  ready: () => Promise.resolve('ready'),
  is: () => false,
};

const navControllerStub = jasmine.createSpyObj('NavController', ['navigateForward', 'navigateBack', 'navigateRoot']);

// ActivatedRoute stub
const activatedRouteStub: any = {
  snapshot: {
    paramMap: new Map<string, string>(),
    queryParamMap: new Map<string, string>(),
  }
};

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [HomePage, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: ApiService, useClass: ApiServiceMock },
        { provide: CartService, useClass: CartServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: MenuController, useValue: jasmine.createSpyObj('MenuController', ['close']) },
        { provide: AnimationController, useValue: animationCtrlStub },
        { provide: Platform, useValue: platformStub },
        { provide: NavController, useValue: navControllerStub },
      ],
    }).compileComponents();

    // Asegura que cualquier inyección posterior use el stub en vez de crear NavController real
    TestBed.overrideProvider(NavController, { useValue: navControllerStub });

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería establecer recomendaciones por defecto al iniciar cuando API devuelve vacío', () => {
    expect(component.recommended.length).toBe(3);
    expect(component.recommended[0].title).toContain('Costillar');
  });

  it('debería filtrar recomendaciones por texto de búsqueda', () => {
    component.allRecommended = [
      { title: 'Pizza Pepperoni', description: 'Queso y pepperoni', price: 8990 },
      { title: 'Ensalada', description: 'Verde', price: 4990 }
    ];
    component.searchText = 'pizza';
    component.applyFilter();
    expect(component.recommended.length).toBe(1);
    expect(component.recommended[0].title).toBe('Pizza Pepperoni');
  });

  it('debería formatear el precio con separador de miles', () => {
    const formatted = component.formatPrice(12990);
    // Acepta punto o coma según locale, pero se espera punto en es-CL
    expect(['12.990', '12,990']).toContain(formatted);
  });

  it('debería usar imagen de respaldo si falla la carga', () => {
    const event: any = { target: { src: 'broken' } };
    component.imgError(event);
    expect(event.target.src).toContain('assets/imagen/fotoperfildemo.jpg');
  });
});
