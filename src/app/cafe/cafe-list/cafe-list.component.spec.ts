import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { CafeListComponent } from './cafe-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { faker } from '@faker-js/faker';
import { By } from '@angular/platform-browser';
import { Cafe } from '../cafe';

describe('CafeListComponent', () => {
    let component: CafeListComponent;
    let fixture: ComponentFixture<CafeListComponent>;
    let debug: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CafeListComponent],
            imports: [
                HttpClientModule,
                FormsModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CafeListComponent);
        component = fixture.componentInstance;

        for (let i = 0; i < 3; i++) {
            const cafe = new Cafe(
                faker.number.int({ min: 1, max: 1000 }),
                faker.commerce.productName(),
                faker.helpers.arrayElement(['Café de Origen', 'Blend']),
                `${faker.location.city()}, ${faker.location.state()}`,
                `${faker.commerce.productAdjective()} y ${faker.commerce.productAdjective()}`,
                faker.number.int({ min: 800, max: 2000 }),
                faker.image.url()
            );
            component.cafes.push(cafe); 
        }

        fixture.detectChanges();
        debug = fixture.debugElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('debe crear la tabla con tres filas más el encabezado', () => {

        const headerRow = debug.queryAll(By.css('table thead tr'));
        const rows = debug.queryAll(By.css('table tbody tr'));

        expect(headerRow.length).toBe(1); 
        expect(rows.length).toBe(3);
    });
});