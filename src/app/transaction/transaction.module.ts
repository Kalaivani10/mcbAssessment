import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TransactionRoutingModule } from "./transaction-routing.module";
import { NewTransactionComponent } from "./new-transaction/new-transaction.component";
import { AngularMaterialModule } from "../material-module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [NewTransactionComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    FlexLayoutModule,
    AngularMaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TransactionModule {}
