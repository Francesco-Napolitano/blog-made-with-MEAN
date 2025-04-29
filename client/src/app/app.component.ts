import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
  <app-navbar/>
  <main>
    <router-outlet />
  </main>
  `,
  styles: [],
})
export class AppComponent {
  title = 'client';
}
