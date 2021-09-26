import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { NgxModule } from './modules/ngx.module';
import { CustomMatTableComponent } from './components/custom-mat-table/custom-mat-table.component';


@NgModule({
  declarations: [
    CustomMatTableComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    NgxModule
  ],
  exports: [
    CustomMatTableComponent,
    HttpClientModule,
    MaterialModule,
    NgxModule
  ]
})
export class CoreModule { }
