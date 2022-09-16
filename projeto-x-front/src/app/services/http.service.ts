import { Cotacao } from './../models/cotacao.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Proposta } from '../models/proposta.model';

@Injectable({ providedIn: 'root' })
export class HttpService {
  contador: string =
    'http://localhost:4000/contadores/630671a2b3dfa66834b7a2f2';
  coberturas: string = 'http://localhost:4000/coberturas';
  cotacao: string = 'http://localhost:4000/cotacoes';
  cpfs: string = 'http://localhost:4000/apolices/cpf/?cpf=';
  proposta: string = 'http://localhost:4000/propostas/busca/?n_proposta=';
  propostas: string = 'http://localhost:4000/propostas/';
  apolice: string = 'http://localhost:4000/propostas/busca/?n_apolice=';

  constructor(private http: HttpClient) {}

  getContador(): Observable<any[]> {
    const data: any = this.http.get<any[]>(this.contador);
    return data;
  }
  getCoberturas(): Observable<any[]> {
    const data: any = this.http.get<any[]>(this.coberturas);
    return data;
  }
  getCPF(cpf: any): Observable<any> {
    const data: any = this.http.get<any>(`${this.cpfs}${cpf}`);

    return data;
  }
  updateNumCotacao() {}
  postCotacao(cotacao: Cotacao): Observable<Cotacao> {
    return this.http.post<Cotacao>(this.cotacao, cotacao);
  }
  postProposta(proposta: Proposta): Observable<Proposta> {
    return this.http.post<Proposta>(this.cotacao, proposta);
  }

  getProposta(proposta: any): Observable<any> {
    const data: any = this.http.get<any>(`${this.proposta}${proposta}`);
    console.log(`${this.proposta}${proposta}`);
    return data;
  }
  getApolice(apolice: any): Observable<any> {
    const data: any = this.http.get<any>(`${this.proposta}${apolice}`);
    console.log(`${this.proposta}${apolice}`);
    return data;
  }
}
