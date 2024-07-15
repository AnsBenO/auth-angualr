import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  authService = inject(AuthService);
  errors: WritableSignal<string[]> = signal([]);
  removingErrors: WritableSignal<boolean> = signal(false);
  errorEffect = effect(
    () => {
      const errorResponse = this.authService.validationError();
      this.errors.set(
        errorResponse
          ? Object.keys(errorResponse.errors).flatMap((key) =>
              errorResponse.errors[key].map((message) => `${key} ${message}`)
            )
          : []
      );
      if (errorResponse) {
        setTimeout(() => {
          this.removingErrors.set(true);
          setTimeout(() => {
            this.errors.set([]);
            this.removingErrors.set(false);
          }, 500);
        }, 5000);
      }
    },
    { allowSignalWrites: true }
  );
}
