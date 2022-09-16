import { Component, OnInit } from '@angular/core';
import { Apolice } from '../models/apolice.model';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-apolice',
  templateUrl: './apolice.component.html',
  styleUrls: ['./apolice.component.css'],
})
export class ApoliceComponent implements OnInit {
  apolice: Apolice = {
    n_apolice: 0,
    nome: '',
    cpf: '',
    inicioVigencia: '',
    terminoVigencia: '',
    valorRisco: '',
    valorPago: '',
    qtParcelas: null,
    cobertura: '',
  };
  coberturas: Array<any> = [];
  coberturaNome: string = '';
  coberturaDescricao: string = '';
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getCoberturas();
    this.getNumApolice();
  }

  getNumApolice() {
    const n_apolice = window.location.search.replace('?apolice=', '');
    console.log(n_apolice);
    this.httpService.getApolice(n_apolice).subscribe((res) => {
      console.log('apolice', res[0].hash);
      this.apolice.n_apolice = res[0].n_proposta;
      this.apolice.nome = res[0].nome;
      this.apolice.cpf = res[0].cpf;
      this.apolice.inicioVigencia = res[0].inicioVigencia;
      this.apolice.terminoVigencia = res[0].terminoVigencia;
      this.apolice.valorRisco = res[0].valorRisco;
      this.apolice.valorPago = res[0].valorPago;
      this.apolice.cobertura = res[0].cobertura;
      this.setNomeCobertura(res[0].cobertura);
      this.setDescricaoCobertura(res[0].cobertura);
    });
  }
  getCoberturas(): void {
    this.httpService
      .getCoberturas()
      .subscribe((value: any) => (this.coberturas = value));
  }
  setNomeCobertura(id: any) {
    console.log(id);
    return this.coberturas.map((item) =>
      id === item._id ? (this.coberturaNome = item.nome) : ''
    );
  }
  setDescricaoCobertura(id: any) {
    console.log(id);
    console.log(this.coberturas);
    return this.coberturas.map((item) =>
      id === item._id ? (this.coberturaDescricao = item.descricao) : ''
    );
  }
}
