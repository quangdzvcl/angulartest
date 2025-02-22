import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from '../shared/header-layout/header-layout.component';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../shared/pipes/UpperCasePipe.pipe';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ProductItems } from '../types/product-item';
import { BlogService } from '../services/blogServices';

@Component({
  selector: 'app-detail',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  id = '';
  constructor(private route: ActivatedRoute, private blogService: BlogService) {
    this.id = String(route.snapshot.paramMap.get('id'));

  }
  productItem: ProductItems = {
    id: 0,
    name: '',
    image: '',
    price: 0
  }

  ngOnInit(): void {
    this.blogService.detailBlogs(+this.id).subscribe(
      ({ data }: any) => {
        this.productItem.id = data.id;
        this.productItem.name = data.title;
        this.productItem.price = data.body;
        this.productItem.image = 'assets/images/product-nike.png';
      }
    )
  }

}
