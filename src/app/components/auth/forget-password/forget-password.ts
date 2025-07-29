import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPassword implements OnDestroy {
  step = 1;
  emailForm: FormGroup;
  codeForm: FormGroup;
  resetForm: FormGroup;
  $destroy = new Subject()

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.codeForm = this.fb.group({
      resetCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onEmailSubmit() {
    if (this.emailForm.valid) {
      this.authService.forgetPassword(this.emailForm.value.email).pipe(takeUntil(this.$destroy)).subscribe((res: any) => {
        this.step = 2;
      })
    }
  }

  onCodeSubmit() {
    if (this.codeForm.valid) {
      this.authService.resetCode(this.codeForm.value).pipe(takeUntil(this.$destroy)).subscribe((res: any) => {
        this.step = 3;
        this.resetForm.patchValue({ email: this.emailForm.value.email });
      })
    }
  }

  onResetSubmit() {
    if (this.resetForm.valid) {
      this.authService.resetEmail(this.resetForm.value).pipe(takeUntil(this.$destroy)).subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      })
    }
  }


  ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }
}
