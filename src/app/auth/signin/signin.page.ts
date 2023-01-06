import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  form = {
    username: '',
    password: ''
  }
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if(form.valid) {
      const newUser: User = {
        username: form.value.username,
        password: form.value.password
      }
      this.userService.addNewUser(newUser).subscribe()
      this.router.navigate(['/login'])
    }
  }

}
