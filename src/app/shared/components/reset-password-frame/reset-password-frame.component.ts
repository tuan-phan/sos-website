import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-frame',
  templateUrl: './reset-password-frame.component.html',
  styleUrls: ['./reset-password-frame.component.scss']
})
export class ResetPasswordFrameComponent implements OnInit {
  formGroup!: FormGroup;
  hide = true;
  isShow: boolean = false;
  regex = '(84|0[3|5|7|8|9])+([0-9]{8})';
  @Input() isDialog: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      numberphone: ['', [Validators.required, Validators.pattern(this.regex)]],
    });
  }

  onSubmit(values: { numberphone: string; password: string }) {
    // TODO: call reset password service / API
  }

  getError(el: any) {
    switch (el) {
      case 'phone':
        if (this.formGroup.get('numberphone')?.hasError('required')) {
          return 'Chưa nhập số điện thoại';
        } else if (this.formGroup.get('numberphone')?.hasError('pattern')) {
          return 'Số điện thoại không đúng';
        }
        break;
      case 'pass':
        if (this.formGroup.get('password')?.hasError('required')) {
          return 'Chưa nhập mật khẩu';
        }
        break;
      default:
        break;
    }

    return '';
  }

}
