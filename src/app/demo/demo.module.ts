import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { DateTimeComponent } from './date-time/date-time.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MomentComponent } from './moment/moment.component';

@NgModule({
  declarations: [
    DateTimeComponent,
    DatePickerComponent,
    MomentComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[
    DateTimeComponent,
    DatePickerComponent,
    MomentComponent
  ]
})
export class DemoModule { }
