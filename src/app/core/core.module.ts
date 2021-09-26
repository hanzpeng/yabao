import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { NgxModule } from './modules/ngx.module';
import { CustomMatTableComponent } from './components/custom-mat-table/custom-mat-table.component';


@NgModule({
  declarations: [
    CustomMatTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxModule,
  ],
  exports: [
    MaterialModule,
    NgxModule,
    CustomMatTableComponent
  ]
})
export class CoreModule { }
