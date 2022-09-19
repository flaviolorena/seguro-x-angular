import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCotacaoComponent } from './lista-cotacao.component';

describe('ListaCotacaoComponent', () => {
  let component: ListaCotacaoComponent;
  let fixture: ComponentFixture<ListaCotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCotacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
