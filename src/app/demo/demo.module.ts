import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { DateTimeComponent } from './date-time/date-time.component';


@NgModule({
  declarations: [
    DateTimeComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[
    DateTimeComponent
  ]
})
export class DemoModule { }
