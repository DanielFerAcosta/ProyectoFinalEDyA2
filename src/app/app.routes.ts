import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/home/home.component').then(
        (component) => component.HomeComponent,
      ),
    title: 'Entrena | Entrenamiento y bienestar',
  },
  {
    path: '**',
    redirectTo: '',
  },
];