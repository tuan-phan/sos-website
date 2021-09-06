import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AbstractControl, FormControl, FormGroup, FormsModule, ValidationErrors, Validators} from "@angular/forms";
import {AuthenService} from "../../../core/http/authen.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {UrgentRequestService} from "../../../core/http/urgent-request.service";

/**
 * Nếu là hỗ trợ một phần, người dùng phải nhập những gì họ có thể hỗ trợ
 * @param descriptionControl
 */
export const requiredIfSupportTypeIsGroup = (descriptionControl: AbstractControl): ValidationErrors | null => {
  if (descriptionControl.parent?.get('support_type')?.value === 'PART') {
    return Validators.required(descriptionControl)
  }
  return null
}

@Component({
  selector: 'app-join-request',
  templateUrl: './join-request.component.html',
  styleUrls: ['./join-request.component.scss'],
  providers: [MatFormFieldModule, FormsModule],
})
export class JoinRequestComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({});
  formSubmitting = false;
  destroy$ = new Subject()

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<JoinRequestComponent>,
              private authService: AuthenService,
              private urgentRequestService: UrgentRequestService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.data.supporter_id) {
      this.loadSupporter(this.data.supporter_id)
    } else {
      this.form = this.buildForm({
        name: '', // todo: tên của user đang login?
        supporter_id: 'supporter_id' // todo: id của user đang login
      })
    }
  }

  // ISupporterInfo
  buildForm(data: any): FormGroup {
    const form = new FormGroup({
      type: new FormControl(data.type || 'user'), // "user", "group"
      support_type: new FormControl(data.support_type), // "Hỗ trợ hết", "Hỗ trợ một phần"
      name: new FormControl(data.name, Validators.required),
      phone: new FormControl(data.phone, Validators.required),
      supporter_id: new FormControl(data.supporter_id ||  data.id, Validators.required), // todo: check data.id, i dont sure about that
      schedule_support_date: new FormControl(data.schedule_support_date),
      description: new FormControl(data.description, requiredIfSupportTypeIsGroup)
    })

    form.get('support_type')?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(type => {
      form.get('description')?.updateValueAndValidity();
    })
    form.get('type')?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(type => {
      if (type === 'group') {
        this.form.get('supporter_id')?.reset()
      } else {
        this.form.get('supporter_id')?.reset('supporter_id') // todo: id của user đang login
      }
    })
    form.get('group')?.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe(type => {
      // todo: tự động điền tên + số điện thoại của nhóm vào form
    })
    return form;
  }

  loadSupporter(requestId: string) {
// todo: after load success
    const supporter = {}
    this.form = this.buildForm(supporter)
  }

  onSubmit(data: any) {
    this.form.markAllAsTouched()
    if (!this.formSubmitting && this.form.valid) {
      this.formSubmitting = true;
      this.urgentRequestService.join(this.data.request_id, this.form.value).subscribe(resp => {
        this.formSubmitting = false;
        this.dialogRef.close(resp)
      }, error => {
        this.formSubmitting = false;
        // todo: handle error
      })
    }
  }

  get isLogged(): boolean {
    return this.authService.isLoggedIn; // todo: fake login
  }

  onCancel() {
    this.dialogRef.close(false)
  }

  ngOnDestroy() {
    if (this.destroy$) {
      this.destroy$.next()
    }
  }
}
