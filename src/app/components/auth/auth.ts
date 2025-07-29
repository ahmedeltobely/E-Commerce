import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth implements OnDestroy {
  form: FormGroup;
  mode: 'login' | 'register' = 'login';
  $destroy = new Subject()
  toastr = inject(ToastrService)

  constructor(private fb: FormBuilder, private _authService: AuthService,private router:Router) {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    const form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
      ]],
      ...(this.mode === 'register' && {
        name: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [
          Validators.required,
          Validators.pattern(/^(\+201|01|00201)[0-2,5][0-9]{8}$/)
        ]],
        rePassword: ['', Validators.required],
      })
    });

    if (this.mode === 'register') {
      form.get('rePassword')?.setValidators([
        Validators.required,
        this.matchPassword.bind(this),
      ]);
    }

    return form;
  }

  switchMode(mode: 'login' | 'register') {
    this.mode = mode;
    this.form = this.createForm();
  }

  matchPassword(control: AbstractControl): ValidationErrors | null {
    return this.form?.get('password')?.value === control.value
      ? null
      : { mismatch: true };
  }

  get f() {
    return this.form.controls;
  }

  onNavigateToForgetPass(){
    this.router.navigate(['/forget-password'])
  }

  onSubmit() {
    if (this.form.invalid) return;
    const service = this.mode === 'login' ? this._authService.register('auth/signin', this.form.value) : this._authService.register('auth/signup', this.form.value);
    service.pipe(takeUntil(this.$destroy)).subscribe((res:any) => {
      this.toastr.success(this.mode === 'register' ? 'Data Sent Successfully' : 'Logged Successfully', 'Sucess')
      if(this.mode !== 'login'){
        this.mode = 'login'
      }else{
        this._authService.storeUserInfo(res);
        this.router.navigate(['/home']);
      }
    })
  }

  ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }
}