import { Component, OnInit } from '@angular/core';
import {PopoverController} from "@ionic/angular";
import {MenuComponent} from "../../../components/menu/menu.component";
import {TokenService} from "../../../services/token.service";
import {NgForm} from "@angular/forms";
import {Professeur} from "../../../interfaces/professeur";
import {ProfesseurService} from "../../../services/professeur.service";
import {Cours} from "../../../interfaces/cours";
import {CoursService} from "../../../services/cours.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  professeurs: Professeur[] = []
  form = {
    nomCours: "",
    nbEtudiants: "",
    professeur: ""
  }
  constructor(
    private popover: PopoverController,
    private tokenService: TokenService,
    private profService: ProfesseurService,
    private courService: CoursService,
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
    this.profService.getAllProfesseur().subscribe(
      prof => {
        this.professeurs = prof
      }
    )
  }

  logout() {
    this.tokenService.logout()
  }

  onSubmit(f: NgForm) {
    console.log()
    const newCours: Cours = {
      nom: f.form.value.nomCours,
      nbEleves: f.form.value.nbEtudiants,
      professeurId: parseInt(f.form.value.professeur)
    }
    this.courService.addNewCours(newCours).subscribe()
    this.router.navigate(['cours'])
  }
}
