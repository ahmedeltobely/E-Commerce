import { ProdcutsService } from './../../core/services/prodcuts/prodcuts';
import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink, RouterModule, CommonModule, MatTooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected _authService = inject(AuthService)
  router = inject(Router)
  mobileMenuOpen = false;
  _productService = inject(ProdcutsService)
  cartLength: number = 0;
  wishlistLength: number = 0;
  menuItems = [
    { label: 'Home', route: '/home' },
    { label: 'Categories', route: '/categories' },
    { label: 'Orders', route: '/orders' },
    { label: 'Brands', route: '/brands' },
    { label: 'Products', route: '/products' }
  ];

  constructor() {
    this._productService.wishlistLength.subscribe(res=>{
      this.wishlistLength = res
    })

     this._productService.cartLength.subscribe(res=>{
      this.cartLength = res
    })
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/auth'])
  }
}
