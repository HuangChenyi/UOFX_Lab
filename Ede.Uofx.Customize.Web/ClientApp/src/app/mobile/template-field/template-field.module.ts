import { BASIC_HTTP_HANDLER, BasicHttpHandler } from '@service/basic-http-handler';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UofxCameraPlugin, UofxGeolocationPlugin, UofxToastPlugin } from '@uofx/app-native';
import { UofxDatePickerModule, UofxErrorBlockModule, UofxErrorTipModule, UofxFormFieldBaseModule } from '@uofx/app-components/form';

import { BasicHttpClient } from '@service/basic-http-client';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TemplateFieldComponent } from './template-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { UofxAvatarModule } from '@uofx/app-components/avatar';
import { UofxModalModule } from '@uofx/app-components/modal';
import { UofxPluginApiService } from '@uofx/plugin/api';
import { UofxTranslateModule } from '@uofx/app-components';
import { UofxUserSelectModule } from '@uofx/app-components/user-select';

const UOF_MODULES = [
  UofxFormFieldBaseModule,
  UofxErrorBlockModule,
  UofxErrorTipModule,
UofxFormFieldBaseModule,
UofxUserSelectModule
];

const BASIC_SERVICES = [
  { provide: BASIC_HTTP_HANDLER, useClass: BasicHttpHandler },
  BasicHttpClient
];

const COMPONENTS = [
  TemplateFieldComponent
];

const UOF_PLUGINS = [
  UofxGeolocationPlugin,
  UofxToastPlugin,
  UofxCameraPlugin,
  UofxAvatarModule,
  UofxDatePickerModule,
  UofxErrorBlockModule,
  UofxErrorTipModule,
  UofxFormFieldBaseModule,
  UofxModalModule,
  UofxTranslateModule,
  UofxUserSelectModule,


];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: TemplateFieldComponent, pathMatch: 'full' }
    ]),
    TranslateModule.forChild(),
    IonicModule,
    ...UOF_MODULES,
  ],
  providers: [UofxPluginApiService, ...UOF_PLUGINS,...BASIC_SERVICES],
  exports: [...COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [...COMPONENTS]
})
export class TemplateFieldAppModule {
  static comp = {
    write: TemplateFieldComponent,
    view: TemplateFieldComponent
  }
}
