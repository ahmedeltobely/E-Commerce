import { Component, OnDestroy, OnInit } from '@angular/core';
import { Categories } from '../../core/services/categories/categories';
import { Subject, takeUntil } from 'rxjs';
import { category, GetCategoriesRes } from '../../shared/models/categories/getCategoriesRes';
import { CommonModule } from '@angular/common';
import { ProdcutsService } from '../../core/services/prodcuts/prodcuts';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  $destroy = new Subject();
  categories!: category[];
  subCategories!: category[];
  selectedCategoryId!: string;
 
  constructor(private _categoryService: Categories, private productService: ProdcutsService) {

  }

  ngOnInit(): void {
    this.fetchAllCategories()
    this.fetchAllWishlistAndCart()
  }

  fetchAllCategories() {
    this._categoryService.getAllCategories().pipe(takeUntil(this.$destroy)).subscribe(res => {
      this.categories = res.data
    })
  }

  fetchAllWishlistAndCart() {
    this.getAllCart()
    this.getAllWishlist()
  }

  getAllCart() {
    this.productService.getAllCart().pipe(takeUntil(this.$destroy)).subscribe((res:any) => {
      this.productService.cartLength.next(res.numOfCartItems);
    })
  }

  getAllWishlist() {
    this.productService.getAllWishList().pipe(takeUntil(this.$destroy)).subscribe((res:any) => {
      this.productService.wishlistLength.next(res.count);
    })
  }

  fetchSubCategoryInfo(id: string) {
    this.selectedCategoryId = id;
    this._categoryService.getSubCategories(id).pipe(takeUntil(this.$destroy)).subscribe(res => {
      this.subCategories = res.data
    })
  }

  ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }
}
