import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from '../shared/header-layout/header-layout.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../shared/pipes/UpperCasePipe.pipe';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { BlogItem, ProductItems } from '../types/product-item';
import { BlogService } from '../services/blogServices';

@Component({
  selector: 'app-delete',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  product = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  })
  constructor(private blogservice: BlogService, private router: Router) {

  }
  get name() {
    return this.product.get('name');
  }

  get price() {
    return this.product.get('price');
  }

  handleAddToCart() {
    if (this.name?.hasError('required') || this.price?.hasError('required')) {
      return;
    }
    const blog: BlogItem = {
      id: Math.random(),
      title: String(this.name?.value),
      body: String(this.price?.value),
      author: 'quangdz'
    }
    console.log(this.name?.value);
    console.log(this.price?.value);
    console.log(blog);
    this.blogservice.postBlog(blog).subscribe(({ data }: any) => {
      if (data.id) {
        this.router.navigate(['/']);
      }
    });
  }
}
