import { PropostaComponent } from './proposta/proposta.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotacaoComponent } from './cotacao/cotacao.component';
import { ApoliceComponent } from './apolice/apolice.component';

const routes: Routes = [
  { path: '', redirectTo: 'cotacao', pathMatch: 'full' },
  { path: 'cotacao', component: CotacaoComponent },
  { path: 'proposta', component: PropostaComponent },
  { path: 'apolice', component: ApoliceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
