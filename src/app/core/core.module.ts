import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { NgxModule } from './modules/ngx.module';
import { CustomMatTableComponent } from './components/custom-mat-table/custom-mat-table.component';
import { OrderByPipe } from './pipes/order-by.pipe';


@NgModule({
  declarations: [
    CustomMatTableComponent,
    OrderByPipe
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
    NgxModule,
    OrderByPipe
  ]
})
export class CoreModule { }
