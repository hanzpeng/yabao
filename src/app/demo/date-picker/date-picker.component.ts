//https://stackblitz.com/edit/demo-ngx-mat-datetime-picker?file=src%2Fapp%2Fapp.component.html
//https://www.npmjs.com/package/@angular-material-components/datetime-picker
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import * as dayjs from 'dayjs';
import * as moment from 'moment'
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone'
import { DayjsTimezone } from 'dayjs';import { FormControl } from '@angular/forms';
// import * as moment from 'moment';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
// import {MomentDateAdapter} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
//import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
//import {default as _rollupMoment} from 'moment';

//const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'YYYY-MM-DD, HH:MM',
//     monthYearLabel: 'YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'YYYY',
//   },
// };

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  // providers: [
  //   // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
  //   // application's root module. We provide it at the component level here, due to limitations of
  //   // our example generation script.
  //   // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  //   // {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  // ],
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
