import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarAdHireUpdatePage } from './car-ad-hire-update.page';

const routes: Routes = [
  {
    path: '',
    component: CarAdHireUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarAdHireUpdatePageRoutingModule {}
