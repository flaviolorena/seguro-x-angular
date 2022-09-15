import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  minDate: any = '';
  maxDate: any = '';
  dataVigencia: any = '';
  avisoData: string = '';
  constructor() {}

  setMinMax() {
    var now = new Date();
    this.minDate = new Date(
      now.getFullYear() + 5,
      now.getMonth(),
      now.getDate() + 1
    );
    this.maxDate = new Date(
      now.getFullYear() + 10,
      now.getMonth(),
      now.getDate() + 1
    );
  }

  vigencia() {
    var novaData = new Date();
    var nextDay = new Date(novaData);

    const date = nextDay.getDate();
    const month = nextDay.getMonth();
    const year = nextDay.getFullYear();
    this.dataVigencia = `${date}/${month}/${year}`;
  }
  // validaVigencia(evento: any) {
  //   console.log('dentro', evento);
  //   const dateInput = evento;
  //   if (dateInput < this.minDate) {
  //     console.log(true, 'min:', this.minDate);
  //     this.avisoData = 'A data mínima deve ser';
  //   }
  //   if (dateInput > this.maxDate) {
  //     console.log(true, 'min:', this.maxDate);
  //   }
  // }
}
