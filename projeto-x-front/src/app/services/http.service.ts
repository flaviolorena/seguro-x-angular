import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HttpService {
  contador: string =
    'http://localhost:4000/contadores/630671a2b3dfa66834b7a2f2';
  coberturas: string = 'http://localhost:4000/coberturas';
  cpfs: string = 'http://localhost:4000/apolices/cpf/?cpf=';
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
    console.log(`${this.cpfs}${cpf}`);

    return data;
  }
}
