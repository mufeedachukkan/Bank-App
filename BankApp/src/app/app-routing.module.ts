import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteaccountComponent } from './deleteaccount/deleteaccount.component';
import { HistorypageComponent } from './historypage/historypage.component';
import { LoginComponent } from './login/login.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'historypage',component:HistorypageComponent},
  {path:'transaction',component:TransactionComponent},
  {path:'credit',component:CreditcardComponent},
  {path:'deleteaccount',component:DeleteaccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
