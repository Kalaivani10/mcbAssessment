import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { AuthorizeModule } from "./authorize/authorize.module";
// import { DashboardModule } from "./dashboard/dashboard.module";
// import { TransactionHistoryModule } from "./transaction-history/transaction-history.module";
// import { TransactionModule } from "./transaction/transaction.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "authorize",
    pathMatch: "full",
  },
  {
    path: "authorize",
    loadChildren: "./authorize/authorize.module#AuthorizeModule",
  },

  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule",
  },
  {
    path: "transaction-history",
    loadChildren:
      "./transaction-history/transaction-history.module#TransactionHistoryModule",
  },
  {
    path: "transaction",
    loadChildren: "./transaction/transaction.module#TransactionModule",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
