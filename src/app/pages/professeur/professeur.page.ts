import { Component, OnInit } from '@angular/core';
import {AlertController, PopoverController} from "@ionic/angular";
import {MenuComponent} from "../../components/menu/menu.component";
import {TokenService} from "../../services/token.service";
import {Professeur} from "../../interfaces/professeur";
import {ProfesseurService} from "../../services/professeur.service";
import {Cours} from "../../interfaces/cours";
import {Preferences} from "@capacitor/preferences";
import {UserPhoto} from "../../interfaces/user-photo";

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.page.html',
  styleUrls: ['./professeur.page.scss'],
})
export class ProfesseurPage implements OnInit {

  allProfs: Professeur[] = []
  boolNomProf: boolean = false
  boolPrenomProf: boolean = false
  boolAge: boolean = false
  constructor(
    private popover: PopoverController,
    private tokenService: TokenService,
    private profService: ProfesseurService,
    private alertController: AlertController
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
    this.getAllProfs()
  }

  ionViewWillEnter() {
    this.ngOnInit()
  }

  getAllProfs() {
    this.profService.getAllProfesseur().subscribe(
      profs => {
        this.allProfs = profs
      }
    )
  }

  async deleteProf(prof: Professeur) {
    this.profService.deleteProfesseur(prof).subscribe()
    this.ngOnInit()
  }

  logout() {
    this.tokenService.logout()
  }

  async consentForDelete(prof: Professeur): Promise<void> {
    const message = `Etes-vous sur(e) de vouloir supprimer le professeur: ${prof.prenom} ${prof.nom} ?`
    const alert = await this.alertController.create({
      header: "Confirmation",
      message: message,
      buttons: [
        {
          text: "Non"
        },
        {
          text: "Oui",
          handler: () => {
            this.deleteProf(prof)
          }
        }
      ]
    })
    await alert.present()
    await alert.onDidDismiss()
  }

  search(event: any) {
    if(event.target.value === "") {
      this.ngOnInit()
    }
    this.allProfs = this.allProfs.filter((prof) => prof.nom.includes(event.target.value) || prof.age.toString().includes(event.target.value) || prof.prenom.includes(event.target.value))
  }

  sortAlphabeticalNomProfAsc() {
    this.allProfs.sort((a, b) => a.nom.localeCompare(b.nom))
    this.boolNomProf = !this.boolNomProf
  }

  sortAlphabeticalNomProfDesc() {
    this.allProfs.sort((a, b) => b.nom.localeCompare(a.nom))
    this.boolNomProf = !this.boolNomProf
  }

  sortAlphabeticalPrenomProfAsc() {
    this.allProfs.sort((a, b) => a.prenom.localeCompare(b.prenom))
    this.boolPrenomProf = !this.boolPrenomProf
  }

  sortAlphabeticalPrenomProfDesc() {
    this.allProfs.sort((a, b) => b.prenom.localeCompare(a.prenom))
    this.boolPrenomProf = !this.boolPrenomProf
  }

  sortNumberAsc() {
    this.allProfs.sort((a, b) => a.age - b.age)
    this.boolAge = !this.boolAge
  }

  sortNumberDesc() {
    this.allProfs.sort((a, b) => b.age - a.age)
    this.boolAge = !this.boolAge
  }

}
