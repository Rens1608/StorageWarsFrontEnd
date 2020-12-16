import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {root} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'storagewarsfrontend';
  constructor(private router: Router) {
  }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
