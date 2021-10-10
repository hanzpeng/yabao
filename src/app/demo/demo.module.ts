import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { DateTimeComponent } from './date-time/date-time.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MomentComponent } from './moment/moment.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { IHashComponent } from './i-hash/i-hash.component';
import { DateTestComponent } from './date-test/date-test.component';

@NgModule({
  declarations: [
    DateTimeComponent,
    DatePickerComponent,
    MomentComponent,
    CheckboxComponent,
    IHashComponent,
    DateTestComponent
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
    DateTestComponent
  ]
})
export class DemoModule { }
