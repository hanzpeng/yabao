import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { DateTimeComponent } from './date-time/date-time.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MomentComponent } from './moment/moment.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { IHashComponent } from './i-hash/i-hash.component';

@NgModule({
  declarations: [
    DateTimeComponent,
    DatePickerComponent,
    MomentComponent,
    CheckboxComponent,
    IHashComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[
    DateTimeComponent,
    DatePickerComponent,
    MomentComponent,
    CheckboxComponent,
    IHashComponent
  ]
})
export class DemoModule { }
