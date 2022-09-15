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
    minDate: 0,
    maxDate: '',
  };
  coberturas: Array<any> = [];
  coberturaDescricao: string = '';
  today: any = '';
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
    this.cotacao.minDate = this.dateService.minDate;
    this.cotacao.maxDate = this.dateService.maxDate;
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
  terminoVigenciaChange(evento: any) {
    const dateInput = new Date(evento);
    const hoje = new Date();
    console.log('vigencia', dateInput);
    console.log('hoje', hoje);
    const min = new Date(this.dateService.minDate);
    const max = new Date(this.dateService.maxDate);
    console.log('min :', min, 'max :', max);

    if (dateInput < min || dateInput > max) {
      this.avisoData = true;
      setTimeout(() => (this.avisoData = false), 9000);
    }
    // if (dateInput > max) {
    //   this.avisoData = `A data máxima deve ser ${this.dateService.maxDate}`;
    //   setTimeout(() => (this.avisoData = ''), 5000);
    // }
    // if (dateInput > max) {
    //   this.avisoData = `A data máxima deve ser ${this.dateService.maxDate}`;
    //   setTimeout(() => (this.avisoData = ''), 5000);
    // }
  }
}
// data min e max devem ser separadas em verificação e exibição, sao formatos diferentes
