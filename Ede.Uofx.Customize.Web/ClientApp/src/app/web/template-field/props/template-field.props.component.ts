/*
此為外掛欄位prop mode的樣板，修改/置換的項事如下
修改selector和templateUrl路徑
修改classname
修改 @Input() exProps 的interface
修改及設定 exProps的interface 名稱和結構
*/

import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { BpmFwPropsComponent } from '@uofx/web-components/form';

/*修改*/
/*置換selector和templateUrl*/

@Component({
  selector: 'uofx-template-field-props-component',
  templateUrl: './template-field.props.component.html',
})

/*修改*/
/*置換class名稱，exProps的interface名稱*/
export class TemplateFieldPropsComponent
  extends BpmFwPropsComponent
  implements OnInit
{
  form: UntypedFormGroup;
  @Input() exProps: TemplateFieldExProps;

  isShowHelloWorld: boolean;
  constructor(public fb: UntypedFormBuilder) {
    super(fb);
  }

  ngOnInit(): void {
    this.initExProps();
    this.initForm();

    /*外掛欄位額外屬性設定(條件站點、簽核條件、主旨....)*/
    // this.initPluginSettings({
    //   /*toBeConditions外掛欄位條件來源、name表單設計顯示條件名稱、
    //   jsonPath欄位值來源、type條件型態、Text(文字)、Numeric(數值)、Department(部門)、Employee(人員)*/
    //   toBeConditions: [
    //     { name: '條件名稱', jsonPath: 'jsonPath', type: 'Text' },
    //   ],
    //   /*toBeNodes簽核站點簽核者來自外掛欄位，name簽核型態顯示名稱 jsonPath欄位值來源*/
    //   toBeNodes: [{ name: '簽核名稱', jsonPath: 'jsonPath' }],
    //   /*toBeSubjects表單主旨資料來源，name主旨名稱 jsonPath欄位值來源*/
    //   toBeSubjects: [{ name: '主旨', jsonPath: 'jsonPath' }],
    //   /*toBeCalculates計算欄位資料來源，name欄位資料名稱 jsonPath欄位值來源*/
    //   toBeCalculates: [{ name: '計算資料名稱', jsonPath: 'jsonPath' }],
    //   /*toBeExports表單匯出資料來源，name欄位資料名稱 jsonPath欄位值來源*/
    //   toBeExports: [{ name: '匯出資料', jsonPath: 'jsonPath' }],
    //   /*searchContentJsonPath表單查詢條件來源，jsonPath欄位值來源*/
    //   searchContentJsonPath: 'jsonPath',
    // });
  }

  initExProps() {
    if (!this.exProps) {
      // 初始化設定額外屬性
      this.exProps = {
        isShowHelloWorld: false,
      };
    } else {
      // 若已有存在的 exProps
      // 看是需要更新還是重設 value
    }
  }

  initForm() {
    Object.keys(this.exProps).forEach((k) => {
      this.addFormControl(k, null);
    });
    this.form.setValue(this.exProps);
  }
}

/*修改*/
/*置換interface名稱*/
export interface TemplateFieldExProps {
  isShowHelloWorld: boolean;
}
