import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {TokenService} from "../../services/token.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {Preferences} from "@capacitor/preferences";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = {
    username: '',
    password: ''
  }

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.userService.getAllUsers().subscribe(
      async users => {
        const currentUser = users.filter((user) => {
          return user.username === f.value.username && user.password === f.value.password
        })
        if (currentUser.length > 0) {
          this.tokenService.saveToken()
          f.reset()
        } else {
          f.reset()
          const message = "Ces identifiants ne correspondent à aucun résultat, veuillez réessayer ou créer un compte"
          const alert = await this.alertController.create({
            header: 'Erreur',
            message,
            buttons: ['Ok']
          })
          await alert.present()
          await alert.onDidDismiss()
        }
      }
    )
  }

}
