import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CotacaoComponent } from './cotacao/cotacao.component';
import { HttpClientModule } from '@angular/common/http';
import { PropostaComponent } from './proposta/proposta.component';
import { ApoliceComponent } from './apolice/apolice.component';
import { ListaCotacaoComponent } from './lista-cotacao/lista-cotacao.component';

@NgModule({
  declarations: [AppComponent, CotacaoComponent, PropostaComponent, ApoliceComponent, ListaCotacaoComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
