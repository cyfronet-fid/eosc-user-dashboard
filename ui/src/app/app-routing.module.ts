import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {MainPageBComponent} from "./main-page-b/main-page.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: MainPageComponent },
  { path: "b-view", component: MainPageBComponent },
  { path: 'auth/:action', component: AuthComponent },
  { path: "**", pathMatch: "full", component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
