import { NgModule } from '@angular/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule,NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

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
    NgxMatNativeDateModule,
    NgxMatMomentModule
  ]
})
export class NgxModule { }
