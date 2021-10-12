import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { FormControl } from '@angular/forms';

import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as minMax from 'dayjs/plugin/minMax';
import * as timezone from 'dayjs/plugin/timezone'
import { DayjsTimezone } from 'dayjs';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(minMax);



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
    let nextDay = dayjs(this.date).add(1, 'day').toDate();
    this.adda("nextDay",nextDay);
    let nextDay2 = dayjs(this.date).add(2, 'day').toDate();
    this.adda("nextDay2",nextDay2);

    let startDates = [];
    startDates.push(dayjs(this.date));
    startDates.push(dayjs(nextDay));
    startDates.push(dayjs(nextDay2));
    let startedAtMin = dayjs.min(startDates);
    this.adda("startedAtMin",startedAtMin.toDate());
    let startedAtMax = dayjs.max(startDates).toDate()
    this.adda("startedAtMin",startedAtMax);



  }
}
