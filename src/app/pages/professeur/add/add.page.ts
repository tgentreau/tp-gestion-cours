import { Component, OnInit } from '@angular/core';
import {PopoverController} from "@ionic/angular";
import {MenuComponent} from "../../../components/menu/menu.component";
import {TokenService} from "../../../services/token.service";
import {NgForm} from "@angular/forms";
import {PhotoService} from "../../../services/photo.service";
import {Professeur} from "../../../interfaces/professeur";
import {ProfesseurService} from "../../../services/professeur.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  form = {
    nom: "",
    prenom: "",
    age: "",
    photo: ""
  }

  photo: any
  constructor(
    private popover: PopoverController,
    private tokenService: TokenService,
    public photoService: PhotoService,
    private profService: ProfesseurService,
    private router: Router
  ) {}

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

  ngOnInit() {
  }

  logout() {
    this.tokenService.logout()
  }

  onSubmit(f: NgForm) {
    const newProf: Professeur = {
      nom: f.value.nom,
      prenom: f.value.prenom,
      age: f.value.age,
      photo: this.photo
    }
    this.profService.addNewProfesseur(newProf).subscribe()
    this.router.navigate(['professeur'])
  }

  async addPhoto() {
    const photo = await this.photoService.addNewToGallery()
    this.photo = photo.webviewPath
  }

}
