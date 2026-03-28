import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'registro',
    // Esta es la forma moderna de cargar la página sin usar .module
    loadComponent: () => import('./pages/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full',
  },
];