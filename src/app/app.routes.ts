import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

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
  path: 'login',
  loadComponent: () =>
    import('./features/auth/login/login.component')
      .then((m) => m.LoginComponent),
},
{
  path: 'register',
  loadComponent: () =>
    import('./features/auth/register/register.component')
      .then((m) => m.RegisterComponent),
},
{
  path: 'dashboard',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/dashboard/dashboard.component')
      .then((m) => m.DashboardComponent),
},
  {
    path: '**',
    redirectTo: '',
  },
];