import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [
  {
    path: "",
    redirectTo: "authorize",
    pathMatch: "full",
  },
  {
    path: "authorize",
    loadChildren: "./auth/auth.module#AuthModule",
  },

  {
    path: "home",
    loadChildren: "./home/home.module#HomeModule",
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
