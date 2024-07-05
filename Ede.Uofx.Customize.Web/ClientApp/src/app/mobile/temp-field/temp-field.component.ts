import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UofxCameraPlugin, UofxGeolocationPlugin, UofxToastPlugin } from '@uofx/app-native';

import { BpmFwWriteComponent } from '@uofx/app-components/form';
import { ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UofxFormTools } from '@uofx/web-components/form';


@Component({
  selector: 'app-template-field',
  templateUrl: './temp-field.component.html',
  styleUrls: ['./temp-field.component.css']
})
export class TempFieldComponent extends BpmFwWriteComponent implements OnInit {
  // label: string = '🎉Hello World';
    form: FormGroup;
    value: any;

    constructor(private uofxGeolocation: UofxGeolocationPlugin, private cdr: ChangeDetectorRef,
        private uofxToast: UofxToastPlugin, private uofxCamera: UofxCameraPlugin,
        private fb: FormBuilder, private modalController: ModalController) {
        super();
    }

    errorMsg: string;

    ngOnInit(): void {

        this.initForm();

        this.parentForm.statusChanges.subscribe(res => {
            if (res === 'INVALID' && this.selfControl.dirty) {
                this.markFormGroup(this.form)
                this.cdr.detectChanges();
            }
        });

        this.form.valueChanges.subscribe(res => {
            const rawValue = this.form.getRawValue();
            if (JSON.stringify(this.selfControl.value) !== JSON.stringify(rawValue)) {

                this.selfControl.setValue(rawValue);
                // 真正送出欄位值變更的函式
                this.valueChanges.emit(rawValue);
                this.cdr.detectChanges();
            }
        });
    }

    markFormGroup(form: FormGroup) {
        Object.keys(form.controls).forEach(key => {
            this.markFormControl(form.get(key));
        });
        this.cdr.detectChanges();
    }

    markFormControl(control: AbstractControl) {
        control.markAsDirty();
        control.markAsTouched();
        control.updateValueAndValidity();
        this.cdr.detectChanges();
    }

    initForm() {
        this.form = this.fb.group({
            message: [this.value?.message || '', Validators.required], // Add required validation
        });

        if (this.selfControl) {
            // 在此便可設定自己的驗證器
            this.selfControl.setValidators(validateSelf(this.form));
            this.selfControl.updateValueAndValidity();
        }
    }

    /*判斷如果是儲存不用作驗證*/
    checkBeforeSubmit(checkValidator: boolean): Promise<boolean> {
        //刷卡驗證前的設定

        return new Promise(resolve => {
            if (checkValidator) {
                return this.checkFieldValid(resolve);
            }
            else {
                resolve(true);
            }
        })
    }


    /** 實作送出前驗證 */
    checkFieldValid(resolve) {
        this.setBeforeCheck(true);
        this.errorMsg = '';
        //實作驗證邏輯
        if (false) {
            this.errorMsg = '驗證失敗的訊息';
            this.cdr.detectChanges();
            resolve(false);
        } else {
            this.errorMsg = '';
            resolve(true);
        }
    }

    /** 驗證前的設定 */
    setBeforeCheck(checkValidator: boolean) {

        this.markFormGroup(this.form);
        // form驗證狀態重製
        if (!checkValidator) this.form.reset(this.form.getRawValue());
        // 暫存時不驗證必填
        checkFieldDefaultValidator(checkValidator, new FormControl(this.form.controls));
    }
}

/*外掛欄位自訂的證器*/
function validateSelf(form: UntypedFormGroup): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return form.valid ? null : { formInvalid: true };
    };
}

/** 暫存時不驗證必填 */
function checkFieldDefaultValidator(checkDefaultValidator: boolean, formControl: FormControl) {
    if (!checkDefaultValidator && formControl.hasError('required')) {
        delete formControl.errors['required'];
        formControl.setErrors(Object.keys(formControl.errors).length === 0 ? null : formControl.errors);
    }
    else if (checkDefaultValidator && formControl.valid) {
        formControl.updateValueAndValidity();
    }
}
