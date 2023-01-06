import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursPageRoutingModule } from './cours-routing.module';

import { CoursPage } from './cours.page';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [CoursPage]
})
export class CoursPageModule {}
