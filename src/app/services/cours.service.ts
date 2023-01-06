import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cours} from "../interfaces/cours";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  coursUrl = "http://localhost:3000/cours"
  constructor(
    private http: HttpClient
  ) { }

  getAllCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.coursUrl)
  }

  addNewCours(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(this.coursUrl, cours)
  }

  deleteCours(cours: Cours): Observable<Cours> {
    return this.http.delete<Cours>(`${this.coursUrl}/${cours.id || 0}`)
  }
}
