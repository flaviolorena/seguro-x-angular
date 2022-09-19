import { Cotacao } from './../models/cotacao.model';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-cotacao',
  templateUrl: './lista-cotacao.component.html',
  styleUrls: ['./lista-cotacao.component.css'],
})
export class ListaCotacaoComponent implements OnInit {
  cotacoes: Array<Cotacao> = [];
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getCotacoes();
  }

  getCotacoes() {
    this.httpService.getCotacoes().subscribe((res: any) => {
      console.log(res);
      this.cotacoes = res;
    });
  }
}
