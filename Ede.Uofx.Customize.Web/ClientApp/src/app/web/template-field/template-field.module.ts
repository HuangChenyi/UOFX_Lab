import {
  BASIC_HTTP_HANDLER,
  BasicHttpHandler,
} from '@service/basic-http-handler';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  UofxFormFieldBaseModule,
  UofxFormModule,
} from '@uofx/web-components/form';
import { UofxLoadingModule, UofxTranslateModule } from '@uofx/web-components';

import { BasicHttpClient } from '@service/basic-http-client';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TemplateFieldPropsComponent } from './props/template-field.props.component';
import { TemplateFieldWriteComponent } from './write/template-field.write.component';
import { TranslateModule } from '@ngx-translate/core';
import { UofxAvatarModule } from '@uofx/web-components/avatar';
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxDialogModule } from '@uofx/web-components/dialog';
import { UofxIconModule } from '@uofx/web-components/icon';
import { UofxPluginApiService } from '@uofx/plugin/api';
import { UofxTextareaModule } from '@uofx/web-components/textarea';
import { UofxToastModule } from '@uofx/web-components/toast';
import { UofxUserSelectModule } from '@uofx/web-components/user-select';
import { UofxUserSetModel } from '@uofx/web-components/user-select';

/*
此為外掛欄位module的樣板，修改/置換的項事如下
修改import 各模式的Component
修改const COMPONENTS  各模式的Component
修改NgModule中的 RouterModule  各模式的Component
修改 class name 及各模式的module
*/

/*↑↑↑↑修改import 各模式的Component↑↑↑↑*/

const PRIMENG_MODULES = [
  CheckboxModule,
  CalendarModule,
  TableModule,DialogModule,InputNumberModule,
  DropdownModule,ButtonModule,
  SkeletonModule
];

const UOF_MODULES = [
  UofxDialogModule,
  UofxFormFieldBaseModule,
  UofxFormModule,
  UofxIconModule,
UofxLoadingModule,
  UofxToastModule,
  UofxTranslateModule,
  UofxUserSelectModule,
  UofxAvatarModule,
  UofxTextareaModule,
  UofxButtonModule
];

/*修改*/
/*置換component名稱*/

const COMPONENTS = [TemplateFieldPropsComponent, TemplateFieldWriteComponent];

const BASIC_SERVICES = [
  { provide: BASIC_HTTP_HANDLER, useClass: BasicHttpHandler },
  BasicHttpClient,
];

/*修改*/
/*置換component名稱*/
/*如果不看站台的預覽結果可不實作RouterModule.forChild*/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'design', pathMatch: 'full' },
      { path: 'design', component: TemplateFieldWriteComponent },
      { path: 'props', component: TemplateFieldPropsComponent },
      { path: 'write', component: TemplateFieldWriteComponent },
      { path: 'view', component: TemplateFieldWriteComponent },
      //有app開發後再實作這段
      {
        path: 'app',
        loadChildren: () => import('../../mobile/template-field/template-field.module').then(m => m.TemplateFieldAppModule)
      }
    ]),
    TranslateModule.forChild(),
    ...PRIMENG_MODULES,
    ...UOF_MODULES,
  ],
  providers: [BASIC_SERVICES, UofxPluginApiService],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})

/*修改*/
/*置換component名稱、class名稱*/
export class TemplateFieldModule {
  static comp = {
    props: TemplateFieldPropsComponent,
    design: TemplateFieldWriteComponent,
    write: TemplateFieldWriteComponent,
    view: TemplateFieldWriteComponent,
    print: TemplateFieldWriteComponent,
  };
}
