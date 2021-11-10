import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { DateTimeComponent } from './date-time/date-time.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MomentComponent } from './moment/moment.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { IHashComponent } from './i-hash/i-hash.component';
import { DateTestComponent } from './date-test/date-test.component';
import { OrderByTestComponent } from './order-by-test/order-by-test.component';
import { EnumTestComponent } from './enum-test/enum-test.component';
import { DateTimePickerTestComponent } from './date-time-picker-test/date-time-picker-test.component';
import { TypeScriptComponent } from './type-script/type-script.component';
import { DemoComponent } from './demo/demo.component';
import { MaterialIconsComponent } from './material-icons/material-icons.component';

@NgModule({
  declarations: [
    DateTimeComponent,
    DatePickerComponent,
    MomentComponent,
    CheckboxComponent,
    IHashComponent,
    DateTestComponent,
    OrderByTestComponent,
    EnumTestComponent,
    DateTimePickerTestComponent,
    TypeScriptComponent,
    DemoComponent,
    MaterialIconsComponent,
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    DateTimeComponent,
    DatePickerComponent,
    MomentComponent,
    CheckboxComponent,
    IHashComponent,
    DateTestComponent,
    OrderByTestComponent,
    EnumTestComponent,
    DateTimePickerTestComponent,
    DemoComponent,
  ]
})
export class DemoModule { }
