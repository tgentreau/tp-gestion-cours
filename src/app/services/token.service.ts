import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {GetResult, Preferences} from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router
  ) { }

  saveToken(): void {
    Preferences.set({
      key: 'token',
      value: "SUPERSECURETOKENULTRASECRET(non)"
    })
    this.router.navigate(['home'])
  }

  isLogged(): Promise<GetResult> {
    return Preferences.get({ key: "token" })
  }

  logout(): void {
    Preferences.remove({ key: "token" })
    this.router.navigate(['login'])
  }
}
