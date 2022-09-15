export interface Cotacao {
  n_cotacao: number | string;
  nome: string;
  cpf: string;
  inicioVigencia: string;
  terminoVigencia: string;
  valorRisco: string;
  cobertura: string;
  minDate: number;
  maxDate: string;
}
