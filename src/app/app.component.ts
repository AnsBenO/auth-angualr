import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationComponent } from './components/notification/notification.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NotificationComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  destroyRef = inject(DestroyRef);
  title = 'Authentication With Angular ';

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
