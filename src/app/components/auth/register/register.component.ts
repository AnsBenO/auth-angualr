import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    console.log(this.registerForm.getRawValue());

    this.authService
      .register(this.registerForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          console.log(response);

          this.authService.setAuthToken(response.user.token);
          this.authService.currentUser.set(response.user);
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
