import { NgModule } from '@angular/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule,NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';


const maskConfig: Partial<IConfig> = { validation: true };


@NgModule({
  imports: [
    NgxMaskModule.forRoot(maskConfig)
  ],
  exports: [
    NgxMatSelectSearchModule,
    NgxMaskModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule
  ]
})
export class NgxModule { }
