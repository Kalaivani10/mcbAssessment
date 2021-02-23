import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';

const routes: Routes = [
  { path: '', redirectTo: 'new-transaction', pathMatch: 'full' },
  { path: 'new-transaction', component: NewTransactionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
