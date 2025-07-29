import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProdcutsService } from '../../core/services/prodcuts/prodcuts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit, OnDestroy {
  $destroy = new Subject();
  cart: any
  router = inject(Router)
  constructor(private productService: ProdcutsService) {
  }

  ngOnInit(): void {
    this.getAllCart()
    this.getAllCartNumbers()
    this.getAllWishlist()
  }

  getAllCartNumbers() {
    this.productService.getAllCart().pipe(takeUntil(this.$destroy)).subscribe((res:any) => {
      this.productService.cartLength.next(res.numOfCartItems);
    })
  }

  getAllWishlist() {
    this.productService.getAllWishList().pipe(takeUntil(this.$destroy)).subscribe((res:any) => {
      this.productService.wishlistLength.next(res.count);
    })
  }

  getAllCart() {
    this.productService.getAllCart().pipe(takeUntil(this.$destroy)).subscribe(res => {
      this.cart = res
    })
  }


  increaseQty(item: any) {
    let i = item.count
    i++
    this.productService.increaseDecreaseQuty(item.product.id, i).pipe(takeUntil(this.$destroy)).subscribe(res => {
      this.cart = res

    })
  }

  decreaseQty(item: any) {
    if (item.count > 1) {
      let i = item.count
      i--;
      this.productService.increaseDecreaseQuty(item.product.id, i).pipe(takeUntil(this.$destroy)).subscribe(res => {
        this.cart = res
      })
    }
  }

  removeItem(item: any) {
    this.productService.deleteCartProduct(item.product.id).pipe(takeUntil(this.$destroy)).subscribe(res => {
      this.cart = res
      this.getAllCartNumbers();
    })
  }

  clearCart() {
    this.productService.deleteAllCart().pipe(takeUntil(this.$destroy)).subscribe(res => {
      this.getAllCart()
      this.getAllCartNumbers()
    })
  }

  trackById(index: number, item: any) {
    return item._id;
  }

  navigateToCheckout(){
    this.router.navigate(['/checkout'])
  }

  ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }
}

