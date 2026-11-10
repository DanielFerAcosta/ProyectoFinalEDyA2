import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="auth-page">
      <div class="auth-card">
        <h1>Mi panel</h1>

        <p>Has iniciado sesión como:</p>
        <p>{{ auth.user()?.email }}</p>

        <p>
          Aquí conectaremos las funcionalidades privadas
          de la aplicación.
        </p>

        @if (error()) {
          <p class="auth-error" role="alert">{{ error() }}</p>
        }

        <button
          type="button"
          (click)="logout()"
          [disabled]="loading()"
        >
          {{ loading() ? 'Saliendo…' : 'Cerrar sesión' }}
        </button>

        <p><a routerLink="/">Volver al inicio</a></p>
      </div>
    </section>
  `,
})
export class DashboardComponent {
  readonly auth = inject(AuthService);

  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal('');

  async logout(): Promise<void> {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.error.set('');

    try {
      await this.auth.signOut();
      await this.router.navigateByUrl('/login');
    } catch (error: unknown) {
      console.error('Error al cerrar sesión:', error);
      this.error.set('No se pudo cerrar sesión. Inténtalo de nuevo.');
    } finally {
      this.loading.set(false);
    }
  }
}