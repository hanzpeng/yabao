import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CustomMatTableComponent,
    HttpClientModule,
    MaterialModule,
    NgxModule,
    OrderByPipe
  ]
})
export class CoreModule { }
