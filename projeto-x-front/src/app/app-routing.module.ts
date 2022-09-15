import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotacaoComponent } from './cotacao/cotacao.component';

const routes: Routes = [
  { path: '', redirectTo: 'cotacao', pathMatch: 'full' },
  { path: 'cotacao', component: CotacaoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
