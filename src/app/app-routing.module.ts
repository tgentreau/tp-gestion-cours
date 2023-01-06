import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./helpers/auth.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
      .then( m => m.HomePageModule), canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'cours',
    loadChildren: () => import('./pages/cours/cours.module')
      .then( m => m.CoursPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'professeur',
    loadChildren: () => import('./pages/professeur/professeur.module')
      .then( m => m.ProfesseurPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./auth/signin/signin.module').then( m => m.SigninPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
