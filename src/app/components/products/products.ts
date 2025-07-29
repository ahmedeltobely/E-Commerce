import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProdcutsService } from '../../core/services/prodcuts/prodcuts';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/products/getProductsRes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit, OnDestroy {
  $destroy = new Subject();
  products!: Product[];
  router = inject(Router)

  constructor(private productService: ProdcutsService) {
  }

  ngOnInit(): void {
    this.fetchAllCategories()
  }

  fetchAllCategories() {
    this.productService.getAllProdcuts().pipe(takeUntil(this.$destroy)).subscribe(res => {
      this.products = res.data
    })
  }

  onViewProductInfo(id:string){
    this.router.navigate([`/products/${id}`])  
  }

  ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }
}
