import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdcutsService } from '../../core/services/prodcuts/prodcuts';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit,OnDestroy {
  form!: FormGroup;
  $destroy = new Subject();

  constructor(private fb: FormBuilder, private productServices: ProdcutsService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^(\+201|01|00201)[0-2,5][0-9]{8}$/)]],
      city: ['', Validators.required],
      details: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.productServices.payNow({ shippingAddress: { ...this.form.value } }).pipe(takeUntil(this.$destroy)).subscribe(res=>{
        
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }
}