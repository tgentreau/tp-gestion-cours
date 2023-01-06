import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = "http://localhost:3000/utilisateur"
  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`)
  }

  addNewUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.userUrl}`, user)
  }
}
