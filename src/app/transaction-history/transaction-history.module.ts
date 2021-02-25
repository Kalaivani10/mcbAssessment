import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TransactionHistoryRoutingModule } from "./transaction-history-routing.module";
import { TransactionHistoryComponent } from "./transaction-history/transaction-history.component";
import { AngularMaterialModule } from "../material-module";

@NgModule({
  declarations: [TransactionHistoryComponent],
  imports: [
    CommonModule,
    TransactionHistoryRoutingModule,
    AngularMaterialModule,
  ],
})
export class TransactionHistoryModule {}
