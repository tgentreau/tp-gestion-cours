import {Component, OnInit} from '@angular/core';
import {PopoverController} from "@ionic/angular";
import {MenuComponent} from "../components/menu/menu.component";
import {TokenService} from "../services/token.service";
import {Preferences} from "@capacitor/preferences";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  constructor(
    private popover: PopoverController,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
  }

  openMenu(e: MouseEvent) {
    this.popover.create({
      component: MenuComponent,
      showBackdrop: true,
      event: e,
    }).then((popoverElement) => {
      popoverElement.present()
      popoverElement.onDidDismiss()
    })
  }

  logout() {
    this.tokenService.logout()
  }
}
