import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularMaterialModule } from '../material-module';
// import { PhoneNumberDirective } from '../Directives/phone-number.directive';
// import { NumberOnlyDirective } from '../Directives/number-only.directive';

@NgModule({
  declarations: [NewTransactionComponent, TransactionHistoryComponent, DashboardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
    // PhoneNumberDirective,
    // NumberOnlyDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule { }
