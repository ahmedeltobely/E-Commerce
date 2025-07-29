import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productInfo } from '../../../shared/models/products/getProductsRes';
import { Subject, takeUntil } from 'rxjs';
import { ProdcutsService } from '../../../core/services/prodcuts/prodcuts';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-info',
  imports: [CommonModule],
  templateUrl: './product-info.html',
  styleUrl: './product-info.css'
})
export class ProductInfo implements OnInit, OnDestroy {
  $destroy = new Subject();
  product!: productInfo;
  productId!: string;
  selectedImage: string | null = null;
  isFavorite = false;
  toastr = inject(ToastrService)


  constructor(private route: ActivatedRoute, private productService: ProdcutsService) {
    this.productId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.fetchProductInfo()
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


  selectImage(img: string): void {
    this.selectedImage = img;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    let  service = this.isFavorite ? this.productService.addtoWhishlist(this.productId) : this.productService.deleteFromWhishlist(this.productId)
    service.pipe(takeUntil(this.$destroy)).subscribe(res => {
      this.toastr.success(this.isFavorite  ? 'Product added to whishlist successfully' : 'Product removed from whishlist successfully', 'Sucess')
      this.getAllWishlist()
    })
  }

  fetchProductInfo() {
    this.productService.getProductById(this.productId).pipe(takeUntil(this.$destroy)).subscribe(res => {
      this.product = res
      this.selectedImage = this.product.data.images[0]

    })
  }

  get filledStars(): number {
    return Math.round(this.product?.data?.ratingsAverage || 0);
  }

  addToCart(id:String){
      this.productService.addToCart(id).pipe(takeUntil(this.$destroy)).subscribe(res => {
      this.toastr.success('Product added to cart successfully' )
      this.getAllCart()
    })
  }

  ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }
}

