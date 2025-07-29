import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { category } from '../../shared/models/categories/getCategoriesRes';
import { BrandsService } from '../../core/services/brands/brands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.html',
  styleUrl: './brands.css'
})
export class Brands implements OnInit,OnDestroy{
 $destroy = new Subject();
  Brands!: category[];
 constructor(private _brandService: BrandsService) {

  }
 ngOnInit(): void {
    this.fetchAllCategories()
  }

  fetchAllCategories(){
    this._brandService.getAllBrands().pipe(takeUntil(this.$destroy)).subscribe(res => {
      this.Brands = res.data
    })
  }
 ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }
  
}
