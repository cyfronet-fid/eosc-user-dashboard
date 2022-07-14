import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import {GridsterModule} from "angular-gridster2";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [CommonModule, GridsterModule, FormsModule],
})
export class DashboardPageModule {}
