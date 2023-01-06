import { Component, OnInit } from '@angular/core';
import {PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menu: any[] = [
    {
      url: "home",
      menu: "Acceuil"
    },
    {
      url: "cours",
      menu: "Gestion des cours"
    },
    {
      url: "professeur",
      menu: "Gestion des professeur"
    }
  ]
  constructor(
    private popover: PopoverController
  ) { }

  ngOnInit() {}

  closePopover(element: string) {
    this.popover.dismiss(element)
  }
}
