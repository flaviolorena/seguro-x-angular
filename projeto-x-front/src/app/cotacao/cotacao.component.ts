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
  avisoData: boolean = false;

  constructor(
    private httpService: HttpService,
    private dateService: DateService
  ) {}
  enviarCotacao() {
    console.log(this.cotacao);
  }

  ngOnInit(): void {
    this.dateService.vigencia();
    this.dateService.setMinMax();
    this.getNumCotacao();
    this.getCoberturas();
    this.setDataVigencia();
    this.setMinMaxDate();
    this.getToday();
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
    const nome = e.value;
    this.coberturas.map((item) =>
      nome === item.nome ? (this.coberturaDescricao = item.descricao) : ''
    );
  }
  getToday() {
    return (this.today = new Date());
  }
  checkCPF(e: any) {
    const cpf = e.value;
    if (cpf.length === 11) {
      console.log(cpf);
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
      this.avisoData = true;
    } else {
      this.validaData = false;
      this.avisoData = false;
    }
  }
}
