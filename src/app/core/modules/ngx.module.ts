import { NgModule } from '@angular/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxMaskModule, IConfig } from 'ngx-mask';
const maskConfig: Partial<IConfig> = { validation: true };


@NgModule({
  imports: [
    NgxMaskModule.forRoot(maskConfig)
  ],
  exports: [
    NgxMatSelectSearchModule,
    NgxMaskModule
  ]
})
export class NgxModule { }
