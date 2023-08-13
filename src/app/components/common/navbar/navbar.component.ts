import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  sideMenuOpened = false;
  closedSideMenu = true;
  constructor(public authService: AuthService) {}

  toggleSideMenu() {
    this.sideMenuOpened = !this.sideMenuOpened;
    this.closedSideMenu = !this.closedSideMenu;
  }

  navLinkClicked() {
    this.closedSideMenu = true;
    this.sideMenuOpened = !this.sideMenuOpened;
  }
}
