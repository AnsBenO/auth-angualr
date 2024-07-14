import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  authService = inject(AuthService);
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          console.log(response);

          this.authService.setAuthToken(response.user.token);
          this.authService.currentUser.set(response.user);
          this.router.navigateByUrl('/');
        },
        error: (error) => console.error(error),
      });
  }
  ngOnInit(): void {
    console.log('login');
  }
}
