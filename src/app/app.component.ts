import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  destroyRef = inject(DestroyRef);
  title = 'auth-app';

  ngOnInit(): void {
    this.authService
      .getUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.authService.currentUser.set(response.user);
        },
        error: () => {
          this.authService.currentUser.set(null);
        },
      });
  }
  logout(): void {
    this.authService.logout();
  }
}
