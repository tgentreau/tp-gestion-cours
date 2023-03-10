import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursPage } from './cours.page';

const routes: Routes = [
  {
    path: '',
    component: CoursPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursPageRoutingModule {}
