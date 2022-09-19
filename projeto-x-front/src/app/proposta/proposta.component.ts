import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Proposta } from '../models/proposta.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proposta',
  templateUrl: './proposta.component.html',
  styleUrls: ['./proposta.component.css'],
})
export class PropostaComponent implements OnInit {
  proposta: Proposta = {
    n_proposta: 0,
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

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.getCoberturas();
    this.getNumProposta();
  }
  getNumProposta() {
    const n_cotacao = window.location.search.replace('?proposta=', '');
    this.httpService.getProposta(n_cotacao).subscribe((res) => {
      this.proposta.n_proposta = res[0].n_proposta;
      this.proposta.nome = res[0].nome;
      this.proposta.cpf = res[0].cpf;
      this.proposta.inicioVigencia = res[0].inicioVigencia;
      this.proposta.terminoVigencia = res[0].terminoVigencia;
      this.proposta.valorRisco = res[0].valorRisco;
      this.proposta.valorPago = res[0].valorPago;
      this.proposta.cobertura = res[0].cobertura;
      this.setNomeCobertura(res[0].cobertura);
      this.setDescricaoCobertura(res[0].cobertura);
    });
  }
  enviarProposta() {
    const proposta: Proposta = {
      n_proposta: this.proposta.n_proposta,
      nome: this.proposta.nome,
      cpf: this.proposta.cpf,
      inicioVigencia: this.proposta.inicioVigencia,
      terminoVigencia: this.proposta.terminoVigencia,
      valorRisco: this.proposta.valorRisco,
      valorPago: this.proposta.valorPago,
      qtParcelas: this.proposta.qtParcelas,
      cobertura: this.proposta.cobertura,
    };

    this.httpService
      .postProposta(proposta)
      .subscribe((res) => console.log(res));
    this.router.navigate(['apolice'], {
      queryParams: { apolice: proposta.n_proposta },
    });
  }
  setNomeCobertura(id: any) {
    return this.coberturas.map((item) =>
      id === item._id ? (this.coberturaNome = item.nome) : ''
    );
  }
  setDescricaoCobertura(id: any) {
    return this.coberturas.map((item) =>
      id === item._id ? (this.coberturaDescricao = item.descricao) : ''
    );
  }
  getCoberturas(): void {
    this.httpService
      .getCoberturas()
      .subscribe((value: any) => (this.coberturas = value));
  }
  calcParcelas(valor: any, parcela: number) {
    const result = valor / parcela;
    return result.toFixed(2);
  }
}
