export interface Apolice {
  n_apolice: number | string;
  nome: string;
  cpf: string;
  inicioVigencia: string;
  terminoVigencia: string;
  valorRisco: string;
  valorPago: string;
  qtParcelas: number | null;
  cobertura: string;
}
