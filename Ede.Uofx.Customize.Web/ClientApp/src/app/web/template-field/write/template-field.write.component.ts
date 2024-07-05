/*
此為外掛欄位wtite mode的樣板，修改/置換的項事如下
修改import 擴充屬性(ExProps)的interface
修改selector和templateUrl路徑
修改classname
修改 @Input() exProps 的interface
*/

import {
  AbstractControl,
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BpmFwWriteComponent, UofxFormTools } from '@uofx/web-components/form';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UofxUserSetItemType, UofxUserSetModel } from '@uofx/web-components/user-select';

import { HRService } from '@service/hrService';
import { Settings } from '@uofx/core';
import { TemplateFieldExProps } from '../props/template-field.props.component';
import { UofxDateFormatPipe } from '@uofx/web-components/pipes';
import { UofxPluginApiService } from '@uofx/plugin/api';

/*修改*/
/*↑↑↑↑修改import 各模式的Component↑↑↑↑*/

/*修改*/
/*置換selector和templateUrl*/
@Component({
  selector: 'uofx-template-field-write-component',
  templateUrl: './template-field.write.component.html',
})

/*修改*/
/*置換className*/
export class TemplateFieldWriteComponent
  extends BpmFwWriteComponent
  implements OnInit {

  /*修改*/
  /*置換className*/
  @Input() exProps: TemplateFieldExProps;

  form: UntypedFormGroup;
  constructor(
    private cdr: ChangeDetectorRef,
    private fb: UntypedFormBuilder,
    private tools: UofxFormTools,
    private pluginService: UofxPluginApiService,
    private hrService:HRService
  ) {
    super();
  }


  dateFormat = new UofxDateFormatPipe();
  levTypeList: Array<ComboBoxItem> = [];
  errorMsg: string;
  systemTime = new Date();
  isLoading = true;
  corpId = Settings.UserInfo.corpId;
  userId= Settings.UserInfo.id;
  account: string;
  types: Array<UofxUserSetItemType> = [UofxUserSetItemType.Empl];
  selectedUserSet: Array<UofxUserSetModel> = [];
  value:LeaveInfo;
  transErrorCodes:Array<string>=[];
  ngOnInit(): void {

    this.getUserInfo(this.userId);

    this.initForm();



    this.parentForm.statusChanges.subscribe((res) => {
      if (res === 'INVALID' && this.selfControl.dirty) {
        if (!this.form.dirty) {
          Object.keys(this.form.controls).forEach((key) => {
            this.tools.markFormControl(this.form.get(key));
          });
          this.form.markAsDirty();
        }
      }
    });

    this.form.valueChanges.subscribe((res) => {
      this.selfControl?.setValue(res);
      /*真正送出欄位值變更的函式*/
      console.log(res);
      this.valueChanges.emit(res);
    });
    this.cdr.detectChanges();
  }

    /** 取得員工資訊 */
    getUserInfo(userId: string) {


      this.pluginService.getUserInfo(userId).subscribe({
        next: empInfo => {
          this.account=  empInfo.account;

        },
        complete: () => {

          this.isLoading = false;

        }
      });
    }

  initForm() {

    this.isLoading = true;
    this.hrService.serverUrl=this.pluginSetting.entryHost;
    this.hrService.getLeaveType().subscribe({
      next: res => {
        this.levTypeList = res.map(x => ({ id: x.leaId, name: x.leaName }));
      },
      complete: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });


    this.form = this.fb.group({
      leaveType: [this.value?.leaveType || ''],
      leaveName: [this.value?.leaveName || ''],
      leaveHours: [this.value?.leaveHours || 0],
      agent: [this.value?.agent || ''],
      startTime: [this.value?.startTime || this.dateFormat.transform(new Date(this.systemTime.getFullYear(),
        this.systemTime.getMonth(),
        this.systemTime.getDate(),
        9), 'yyyy/MM/dd HH:mm')],
      endTime: [this.value?.endTime || this.dateFormat.transform(new Date(this.systemTime.getFullYear(),
        this.systemTime.getMonth(),
        this.systemTime.getDate(),
        18), 'yyyy/MM/dd HH:mm')],
      applicant: [this.value?.applicant || Settings.UserInfo.account],
    });


    if (this.value?.agent) {
      this.selectedUserSet = this.value?.agent;
    }

    if (this.selfControl) {
      // 在此便可設定自己的驗證器
      this.selfControl.setValidators(validateSelf(this.form));
      this.selfControl.updateValueAndValidity();
    }
  }

  onSelectLeaveType(event) {

    if (event.value != null) {
      let leaName = this.levTypeList.find(x => x.id == event.value).name;

      this.form.controls.leaveName.setValue(leaName);

    }

  }

  /*判斷如果是儲存不用作驗證*/
  checkBeforeSubmit(checkValidator: boolean): Promise<boolean> {

    // 儲存不需要驗證，直接回傳true
    if (!checkValidator) {
      return new Promise((resolve) => {
        resolve(true);
      });
    }
    else {

      return new Promise((resolve) => {

        if (checkValidator) {
          return this.checkFieldValid(resolve);
        }
        else {
          resolve(true);
        }
      });
    }
  }

  /** 實作送出前驗證 */
  checkFieldValid(resolve) {
    this.setBeforeCheck(true);
    this.errorMsg = '';
    this.transErrorCodes = [];
    //實作驗證邏輯


    if(this.isLoading){
      resolve(false);

    }


    if (this.form.value.endTime<this.form.value.startTime) {

      this.errorMsg = '結束時間不可早於開始時間';
      this.transErrorCodes.push('結束時間不可早於開始時間');
      resolve(false);
    } else {

      this.errorMsg = '';
      resolve(true);
    }
  }

  /** 驗證前的設定 */
  setBeforeCheck(checkValidator: boolean) {

    this.tools.markFormGroup(this.form);
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

export interface ComboBoxItem {
  id: string;
  name: string;
}



export interface LeaveInfo {
  leaveType: string;
  leaveName: string;
   startTime: string;
   endTime: string;
   leaveHours: number;
   agent: Array<UofxUserSetModel>;
   applicant:string;
  }
