import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { DateService } from './../services/date.service';
import { HttpService } from '../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Cotacao } from '../models/cotacao.model';

@Component({
  selector: 'app-cotacao',
  templateUrl: './cotacao.component.html',
  styleUrls: ['./cotacao.component.css'],
})
export class CotacaoComponent implements OnInit {
  cotacao: Cotacao = {
    n_cotacao: '',
    nome: '',
    cpf: '',
    inicioVigencia: '',
    terminoVigencia: '',
    valorRisco: '',
    cobertura: '',
  };
  minDate: any = '';
  maxDate: any = '';
  coberturas: Array<any> = [];
  coberturaDescricao: string = '';
  today: any = '';
  existeCPF: boolean = false;
  validaData: boolean = false;

  constructor(
    private httpService: HttpService,
    private dateService: DateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dateService.vigencia();
    this.dateService.setMinMax();
    this.getNumCotacao();
    this.getCoberturas();
    this.setDataVigencia();
    this.setMinMaxDate();
    this.getToday();
  }

  enviarCotacao() {
    console.log(this.cotacao);
    this.httpService.updateNumCotacao(this.cotacao.n_cotacao).subscribe();
    const cotacao: Cotacao = {
      n_cotacao: this.cotacao.n_cotacao,
      nome: this.cotacao.nome,
      cpf: this.cotacao.cpf,
      inicioVigencia: this.cotacao.inicioVigencia,
      terminoVigencia: this.cotacao.terminoVigencia,
      valorRisco: this.cotacao.valorRisco,
      cobertura: this.cotacao.cobertura,
    };
    this.httpService.postCotacao(cotacao).subscribe((res) => console.log(''));
    this.router
      .navigate(['proposta'], {
        queryParams: { proposta: cotacao.n_cotacao },
      })
      .then(() => {
        window.location.reload();
      });
  }

  getNumCotacao(): void {
    this.httpService
      .getContador()
      .subscribe((value: any) => (this.cotacao.n_cotacao = value.n_cotacao));
  }
  getCoberturas(): void {
    this.httpService
      .getCoberturas()
      .subscribe((value: any) => (this.coberturas = value));
  }
  setDataVigencia(): void {
    this.cotacao.inicioVigencia = this.dateService.dataVigencia;
  }
  setMinMaxDate() {
    this.minDate = this.dateService.minDate;
    this.maxDate = this.dateService.maxDate;
  }
  coberturaChange(e: any) {
    const id = e.value;
    this.coberturas.map((item) =>
      id === item._id ? (this.coberturaDescricao = item.descricao) : ''
    );
  }
  getToday() {
    return (this.today = new Date());
  }
  checkCPF(e: any) {
    const cpf = e.value;
    if (cpf.length === 11) {
      this.buscaCPF(cpf);
    }
  }
  buscaCPF(cpf: any) {
    this.httpService
      .getCPF(cpf)
      .subscribe((value: any) =>
        value.length !== 0 ? (this.existeCPF = true) : (this.existeCPF = false)
      );
  }
  vigenciaChange(e: any) {
    const data = new Date(e.value);
    if (data < this.minDate || data > this.maxDate) {
      this.validaData = true;
    } else {
      this.validaData = false;
    }
  }
}
