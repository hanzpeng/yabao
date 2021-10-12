import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import * as dayjs from 'dayjs';
import * as moment from 'moment'
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone'
import { DayjsTimezone } from 'dayjs';import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  constructor() {}
  @ViewChild("grida") grida: ElementRef;
  @ViewChild("gridb") gridb: ElementRef;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  selectedDate: Date;
  public dateControl = new FormControl(new Date());
  public get date():Date
  {
    return <Date>this.dateControl.value;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.testa();
  }

  click(){
    this.clear();
    this.testa();
  }
  clear(){
    this.grida.nativeElement.innerHTML="";
    this.gridb.nativeElement.innerHTML="";
  }
  adda(label: string, value: any) {
    this.grida.nativeElement.innerHTML += `<div>${label}</div><div>${value}</div>`
  }
  addb(label: string, value: any) {
    this.gridb.nativeElement.innerHTML += `<div>${label}</div><div>${value}</div>`
  }
  testa(){
    this.adda("localDate",this.date.toString());
    this.adda("isoDate",this.date.toISOString());
  }
}
