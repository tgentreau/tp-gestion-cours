import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Professeur} from "../interfaces/professeur";

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {
  professeurUrl = "http://localhost:3000/professeur"
  constructor(
    private http: HttpClient
  ) { }

  getAllProfesseur(): Observable<Professeur[]> {
    return this.http.get<Professeur[]>(this.professeurUrl)
  }

  getProfById(id: number): Observable<Professeur> {
    return this.http.get<Professeur>(`${this.professeurUrl}/${id}`)
  }

  addNewProfesseur(professeur: Professeur): Observable<Professeur> {
    return this.http.post<Professeur>(this.professeurUrl, professeur)
  }

  deleteProfesseur(professeur: Professeur): Observable<Professeur> {
    return this.http.delete<Professeur>(`${this.professeurUrl}/${professeur.id || 0}`)
  }
}
