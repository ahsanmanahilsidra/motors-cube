import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsuranceSingleViewPageRoutingModule } from './insurance-single-view-routing.module';

import { InsuranceSingleViewPage } from './insurance-single-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsuranceSingleViewPageRoutingModule
  ],
  declarations: [InsuranceSingleViewPage]
})
export class InsuranceSingleViewPageModule {}
