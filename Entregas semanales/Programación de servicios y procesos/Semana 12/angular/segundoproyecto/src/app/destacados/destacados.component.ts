import { Component } from '@angular/core';

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrl: './destacados.component.css'
})
export class DestacadosComponent {
    numero_articulos: number = 20;
    articulos = Array(this.numero_articulos).fill(0)
}
