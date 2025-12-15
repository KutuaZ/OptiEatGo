import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaPage } from './mapa.page';
import { Router } from '@angular/router';

describe('MapaPage', () => {
  let component: MapaPage;
  let fixture: ComponentFixture<MapaPage>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaPage],
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MapaPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería navegar a home al cerrar el mapa', () => {
    component.close();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('debería tener el método ionViewDidEnter definido', () => {
    expect(component.ionViewDidEnter).toBeDefined();
    expect(typeof component.ionViewDidEnter).toBe('function');
  });
});
