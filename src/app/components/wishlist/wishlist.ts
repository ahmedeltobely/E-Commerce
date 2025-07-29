import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ProdcutsService } from '../../core/services/prodcuts/prodcuts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {
  $destroy = new Subject();
  wishlist!: any[];
  toastr = inject(ToastrService)
  constructor( private productService: ProdcutsService) {
  }

  ngOnInit(): void {
    this.fetchWishlist()
  }

  fetchWishlist() {
    this.productService.getAllWishList().pipe(takeUntil(this.$destroy)).subscribe((res:any) => {
      this.wishlist = res.data
    })
  }


  getAllWishlist() {
    this.productService.getAllWishList().pipe(takeUntil(this.$destroy)).subscribe((res:any) => {
      this.productService.wishlistLength.next(res.count);
    })
  }

  removeFormWishlist(id:String){
     this.productService.deleteFromWhishlist(id).pipe(takeUntil(this.$destroy)).subscribe(res => {
      this.toastr.success('Product removed from whishlist successfully', 'Sucess')
      this.fetchWishlist()
      this.getAllWishlist()
    })
  }
     

  ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }
}
