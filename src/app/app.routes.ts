import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { GuestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadComponent: () => import('./components/auth/auth').then(m => m.Auth),
        canActivate: [GuestGuard],
    },
    {
        path: 'home',
        loadComponent: () => import('./components/home/home').then(m => m.Home),
        canActivate: [AuthGuard],
    },
    {
        path: 'brands',
        loadComponent: () => import('./components/brands/brands').then(m => m.Brands),
        canActivate: [AuthGuard],
    },
    {
        path: 'products',
        loadComponent: () => import('./components/products/products').then(m => m.Products),
        canActivate: [AuthGuard],
    },
    {
        path: 'products/:id',
        loadComponent: () => import('./components/products/product-info/product-info').then(m => m.ProductInfo),
        canActivate: [AuthGuard],
    },
    {
        path: 'wishList',
        loadComponent: () => import('./components/wishlist/wishlist').then(m => m.Wishlist),
        canActivate: [AuthGuard],
    },
    {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart').then(m => m.Cart),
        canActivate: [AuthGuard],
    },
    {
        path: 'checkout',
        loadComponent: () => import('./components/checkout/checkout').then(m => m.Checkout),
        canActivate: [AuthGuard],
    },
    {
        path: 'forget-password',
        loadComponent: () => import('./components/auth/forget-password/forget-password').then(m => m.ForgetPassword),
        canActivate: [GuestGuard],
    },
];
