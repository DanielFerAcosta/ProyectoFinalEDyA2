import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="auth-page">
      <div class="auth-card">
        <h1>Crear cuenta</h1>
        <p>Regístrate para empezar.</p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <label for="register-email">Correo electrónico</label>
          <input
            id="register-email"
            type="email"
            formControlName="email"
            autocomplete="email"
            required
          />

          @if (form.controls.email.touched &&
               form.controls.email.invalid) {
            <small class="auth-error">
              Introduce un correo válido.
            </small>
          }

          <label for="register-password">Contraseña</label>
          <input
            id="register-password"
            type="password"
            formControlName="password"
            autocomplete="new-password"
            minlength="8"
            required
          />

          <small>Utiliza al menos 8 caracteres.</small>

          <label for="register-confirm">Repetir contraseña</label>
          <input
            id="register-confirm"
            type="password"
            formControlName="confirmPassword"
            autocomplete="new-password"
            required
          />

          @if (error()) {
            <p class="auth-error" role="alert">{{ error() }}</p>
          }

          @if (message()) {
            <p class="auth-success" role="status">
              {{ message() }}
            </p>
          }

          <button
            type="submit"
            [disabled]="loading() || completed()"
          >
            {{ loading() ? 'Creando cuenta…' : 'Crear cuenta' }}
          </button>
        </form>

        <p>
          ¿Ya tienes cuenta?
          <a routerLink="/login">Inicia sesión</a>
        </p>

        <a routerLink="/">Volver al inicio</a>
      </div>
    </section>
  `,
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly completed = signal(false);
  readonly error = signal('');
  readonly message = signal('');

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(8)],
    ],
    confirmPassword: ['', Validators.required],
  });

  async submit(): Promise<void> {
    if (this.loading() || this.completed()) {
      return;
    }

    this.error.set('');
    this.message.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set(
        'Introduce un correo válido y una contraseña de al menos 8 caracteres.',
      );
      return;
    }

    const { email, password, confirmPassword } =
      this.form.getRawValue();

    if (password !== confirmPassword) {
      this.error.set('Las contraseñas no coinciden.');
      return;
    }

    this.loading.set(true);

    try {
      const result = await this.auth.signUp(email, password);

      if (result.needsEmailConfirmation) {
        this.completed.set(true);
        this.message.set(
          'Solicitud enviada. Revisa tu correo para confirmar ' +
          'la cuenta antes de iniciar sesión.',
        );

        this.form.controls.password.reset();
        this.form.controls.confirmPassword.reset();
      } else {
        await this.router.navigateByUrl('/dashboard');
      }
    } catch (error: unknown) {
      console.error('Error al registrar:', error);

      this.error.set(
        'No se pudo completar el registro. Revisa tu conexión ' +
        'y los requisitos de contraseña del proyecto.',
      );
    } finally {
      this.loading.set(false);
    }
  }
}