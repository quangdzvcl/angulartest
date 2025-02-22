import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, signal, SimpleChanges } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '../pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../pipes/UpperCasePipe.pipe';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ProductItems } from '../../types/product-item';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  imports: [RouterOutlet, FormsModule, UpperCasePipe, CurrencyPipe, NgFor, RouterLink],
})

export class ProductItemComponent implements OnChanges, OnDestroy {
  @Input() productList: any[] = []; // cách input cũ <v16

  @Output() dataEvent1 = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['productList'].currentValue);
    console.log(changes['productList'].previousValue);
  }
  ngOnDestroy(): void {
    console.log('component destroy');
  }
  handleDelete = (id: number) => {
    this.dataEvent1.emit(id);
    //console.log(id);
  }

  get totalPrice(): string {
    const sum = this.productList.reduce((total, item) => {
      return total + item.price;
    }, 0)
    return `Total price ${sum}`;
  }
}