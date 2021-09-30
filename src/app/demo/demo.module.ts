import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { DateTimeComponent } from './date-time/date-time.component';
import { DatePickerComponent } from './date-picker/date-picker.component';


@NgModule({
  declarations: [
    DateTimeComponent,
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[
    DateTimeComponent,
    DatePickerComponent
  ]
})
export class DemoModule { }
