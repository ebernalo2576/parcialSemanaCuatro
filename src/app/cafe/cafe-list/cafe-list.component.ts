import { Component } from '@angular/core';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-list',
  templateUrl: './cafe-list.component.html',
  styleUrl: './cafe-list.component.css'
})
export class CafeListComponent {
    cafes: Array<Cafe> = [];

    constructor(private cafeService: CafeService) {}

    ngOnInit() {
        this.getCafes();
    }

    getCafes(): void {
        this.cafeService.getCafes().subscribe((cafes) => {
            this.cafes = cafes;
        })
    }

    get totalCafeOrigen(): number {
        return this.cafes.filter(cafe => cafe.tipo === 'Café de Origen').length;
    }

    get totalBlend(): number {
        return this.cafes.filter(cafe => cafe.tipo === 'Blend').length;
    }
}
