import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductItemComponent } from '../shared/product-item/product-item.component';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { BlogService } from '../services/blogServices';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, FormsModule, ProductItemComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  nameBtn = 'Click Me!';
  clickMessage = '';

  bindingMessage = '';
  isVissible = true;

  getBlogAPI: Subscription;
  products = [
    {
      id: 1,
      name: 'Nike 1ss',
      price: 400000,
      image: 'assets/images/product-nike.png'
    },
    {
      id: 2,
      name: 'Nike 2',
      price: 100000,
      image: 'assets/images/product-nike.png'
    },
    {
      id: 3,
      name: 'Nike 3',
      price: 200000,
      image: 'assets/images/product-nike.png'
    },
    {
      id: 4,
      name: 'Nike 4',
      price: 300000,
      image: 'assets/images/product-nike.png'
    },
  ]

  constructor(private blogService: BlogService) {
    console.log('constructor create');
    this.getBlogAPI = new Subscription();
  }

  // ngOnInit(): void {
  //   console.log('onInit create');
  //   this.blogService.getBlogs()
  //     .subscribe(({ data }) => {
  //       this.products = data.map((item: any) => {
  //         return {
  //           ...item,
  //           price: Number(item.body),
  //           image: 'assets/images/product-nike.png',
  //           name: item.title
  //         }
  //       })
  //     });
  // }

  // ngOnInit(): void {
  //   this.getBlogAPI = this.blogService
  //     .getBlogs()
  //     .pipe(
  //       map(({ data }) =>
  //         data.map((item: any) => {
  //           return {
  //             ...item,
  //             price: Number(item.body),
  //             image: 'assets/images/product-nike.png',
  //             name: item.title
  //           };
  //         })
  //       )
  //     )
  //     .subscribe((res) => {
  //       this.products = res;
  //     });
  // }

  ngOnInit(): void {
    this.getBlogAPI = this.blogService.getBlogs().pipe(
      map(({ data }) => {
        return data.map((item: any) => {
          return {
            ...item,
            price: Number(item.body),
            image: 'assets/images/product-nike.png',
            name: item.title
          }
        })
      }
      )
    )
      .subscribe((res) => {
        this.products = res;
      })
  }

  ngDestroy(): void {
    if (this.getBlogAPI) {
      this.getBlogAPI.unsubscribe();
      console.log(' get blog api unsubcribe');
    }
  }

  // ngDoCheck(): void {
  //   console.log('Check component');
  // }
  // HandleChangeVisible=() =>{
  //   console.log("tắt nè");
  //   this.isVissible = false;
  // }

  HandleChangeVisible(): void {
    console.log("tắt nèsss");
    this.isVissible = false;
  }

  handleClickMe(): void {
    this.clickMessage = 'quangdz vừa click nè';
  }

  updateField(): void {
    console.log("quangdzzzzz");
  }

  handleDelete = (id: number) => {
    console.log('ddd L : ' + id);
    this.blogService.deleteBlog(id).subscribe(({ data }: any) => {
      if (data == 1) {
        this.products = this.products.filter(product => product.id !== id);
      }
    })
    //  var product = this.products.findIndex(x=>x.id==id);
    //  if(product!==-1){
    //    this.products.splice(product,1);
    //  }
  }
}