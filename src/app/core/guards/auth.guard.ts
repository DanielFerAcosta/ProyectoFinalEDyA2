import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  try {
    await auth.ready;

    if (auth.user()) {
      return true;
    }
  } catch (error: unknown) {
    console.error(
      'No se pudo comprobar la sesión:',
      error,
    );
  }

  return router.createUrlTree(['/login']);
};