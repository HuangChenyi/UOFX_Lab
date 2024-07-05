import { BASIC_HTTP_HANDLER, BasicHttpHandler } from '@service/basic-http-handler';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UofxCameraPlugin, UofxGeolocationPlugin, UofxToastPlugin } from '@uofx/app-native';

import { BasicHttpClient } from '@service/basic-http-client';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TempFieldComponent } from './temp-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { UofxErrorBlockModule, UofxErrorTipModule, UofxFormFieldBaseModule } from '@uofx/app-components/form';
import { UofxPluginApiService } from '@uofx/plugin/api';

const UOF_MODULES = [
    UofxErrorBlockModule,
    UofxErrorTipModule,
  UofxFormFieldBaseModule,
];

const BASIC_SERVICES = [
  { provide: BASIC_HTTP_HANDLER, useClass: BasicHttpHandler },
  BasicHttpClient
];

const COMPONENTS = [
  TempFieldComponent
];

const UOF_PLUGINS = [
  UofxGeolocationPlugin,
  UofxToastPlugin,
  UofxCameraPlugin
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: TempFieldComponent, pathMatch: 'full' }
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
export class TempFieldAppModule {
  static comp = {
    write: TempFieldComponent,
    view: TempFieldComponent
  }
}
