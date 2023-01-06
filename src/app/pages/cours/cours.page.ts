import {Component, OnInit} from '@angular/core';
import {AlertController, PopoverController} from "@ionic/angular";
import {MenuComponent} from "../../components/menu/menu.component";
import {TokenService} from "../../services/token.service";
import {HttpClient} from "@angular/common/http";
import {CoursService} from "../../services/cours.service";
import {Cours} from "../../interfaces/cours";
import {Professeur} from "../../interfaces/professeur";
import {ProfesseurService} from "../../services/professeur.service";

@Component({
  selector: 'app-cours',
  templateUrl: './cours.page.html',
  styleUrls: ['./cours.page.scss'],
})
export class CoursPage implements OnInit {
  allCours: Cours[] = []
  professeur: Professeur[] = []

  boolCours: boolean = false
  boolEtudiant: boolean = false

  constructor(
    private popover: PopoverController,
    private tokenService: TokenService,
    private courService: CoursService,
    private profService: ProfesseurService,
    private alertController: AlertController
  ) {
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

  ngOnInit(): void {
    this.getCours()
    this.getProfs()
  }

  ionViewWillEnter() {
    this.ngOnInit()
  }

  getCours(): void {
    this.courService.getAllCours().subscribe(
      cours => {
        this.allCours = cours
      }
    )
  }

  getProfs(): void {
    this.profService.getAllProfesseur().subscribe(
      prof => {
        this.professeur = prof
      }
    )
  }

  getProfName(id: number): string {
    const prof = this.professeur.find((p) => p.id === id)
    return prof ? prof.nom : ''
  }

  getProfPhoto(id: number): string {
    const prof = this.professeur.find((p) => p.id === id)
    return prof ? prof.photo : ''
  }

  deleteCours(cours: Cours): void {
    this.courService.deleteCours(cours).subscribe()
  }

  logout() {
    this.tokenService.logout()
  }

  async consentForDelete(cours: Cours): Promise<void> {
    const message = `Etes-vous sur(e) de vouloir supprimer le cours: ${cours.nom} ?`
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
            this.deleteCours(cours)
          }
        }
      ]
    })
    await alert.present()
    await alert.onDidDismiss()
  }

  search(event: any) {
    if (event.target.value === "") {
      this.ngOnInit()
    }
    this.allCours = this.allCours.filter((cours) => cours.nom.includes(event.target.value) || cours.nbEleves.toString().includes(event.target.value))
  }

  sortAlphabeticalCoursAsc() {
    this.allCours.sort((a, b) => a.nom.localeCompare(b.nom))
    this.boolCours = !this.boolCours
  }

  sortAlphabeticalCoursDesc() {
    this.allCours.sort((a, b) => b.nom.localeCompare(a.nom))
    this.boolCours = !this.boolCours
  }

  sortNumberAsc() {
    this.allCours.sort((a, b) => a.nbEleves - b.nbEleves)
    this.boolEtudiant = !this.boolEtudiant
  }

  sortNumberDesc() {
    this.allCours.sort((a, b) => b.nbEleves - a.nbEleves)
    this.boolEtudiant = !this.boolEtudiant
  }

}
