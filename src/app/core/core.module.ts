import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { NgxModule } from './modules/ngx.module';
import { CustomMatTableComponent } from './components/custom-mat-table/custom-mat-table.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';



@NgModule({
  declarations: [
    CustomMatTableComponent,
    OrderByPipe,
    DateTimePickerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxModule,
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    NgxModule,
    CustomMatTableComponent,
    OrderByPipe,
    DateTimePickerComponent
  ]
})
export class CoreModule { }
