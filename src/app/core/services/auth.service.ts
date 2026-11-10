import {
  DestroyRef,
  Injectable,
  inject,
  signal,
} from '@angular/core';
import type { User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

export interface SignUpResult {
  needsEmailConfirmation: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly supabase =
    inject(SupabaseService).client;

  private readonly destroyRef = inject(DestroyRef);

  private readonly currentUser =
    signal<User | null>(null);

  private authEventVersion = 0;

  readonly user = this.currentUser.asReadonly();

  readonly ready: Promise<void>;

  constructor() {
    const { data } =
      this.supabase.auth.onAuthStateChange(
        (_event, session) => {
          this.authEventVersion += 1;

          this.currentUser.set(
            session?.user ?? null,
          );
        },
      );

    this.destroyRef.onDestroy(() => {
      data.subscription.unsubscribe();
    });

    this.ready = this.restoreSession();

    // Registrar el fallo inicial sin ocultarlo a quien espere ready.
    void this.ready.catch((error: unknown) => {
      console.error(
        'Error al recuperar la sesión:',
        error,
      );
    });
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<SignUpResult> {
    await this.ready;

    const { data, error } =
      await this.supabase.auth.signUp({
        email: email.trim(),
        password,
      });

    if (error) {
      throw error;
    }

    if (data.session) {
      this.currentUser.set(data.session.user);
    }

    return {
      needsEmailConfirmation:
        data.session === null,
    };
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<void> {
    await this.ready;

    const { data, error } =
      await this.supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (error) {
      throw error;
    }

    if (!data.session) {
      throw new Error(
        'No se pudo establecer la sesión.',
      );
    }

    this.currentUser.set(data.session.user);
  }

  async signOut(): Promise<void> {
    await this.ready;

    const { error } =
      await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }

    this.currentUser.set(null);
  }

  private async restoreSession(): Promise<void> {
    const version = this.authEventVersion;

    const { data, error } =
      await this.supabase.auth.getSession();

    if (error) {
      throw error;
    }

    if (
      !this.destroyRef.destroyed &&
      version === this.authEventVersion
    ) {
      this.currentUser.set(
        data.session?.user ?? null,
      );
    }
  }
}