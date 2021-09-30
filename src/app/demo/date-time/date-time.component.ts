//https://stackblitz.com/edit/demo-ngx-mat-datetime-picker?file=src%2Fapp%2Fapp.component.html
//https://www.npmjs.com/package/@angular-material-components/datetime-picker

//https://stackoverflow.com/questions/62767985/how-can-i-customize-date-and-time-format-in-ngx-mat-datetime-picker
//https://gist.githubusercontent.com/nandhakumargdr/635af05419793e15f3758656ddd1ef39/raw/337cf9ad8157c5e8ebd1de02437b2d56b7024f0b/CustomNgxDatetimeAdapter.ts

import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { NgxMatDateAdapter, NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import {CustomNgxDatetimeAdapter} from './custom-adapter';
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
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD, HH:MM',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS'
  },
  display: {
    dateInput: 'MM/DD/YYYY h:mm A Z',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

    {provide: NgxMatDateAdapter, useClass: CustomNgxDatetimeAdapter, deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS]    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
})
export class DateTimeComponent implements OnInit {

  @ViewChild('picker') picker: any;
  constructor(private http: HttpClient, private zone: NgZone) {
  }

  ngOnInit() {
    this.date = moment(new Date(2021, 9, 4, 5, 6, 7));
  }

  public dateControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));

  public date: moment.Moment;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public disabled = false;

  public color: ThemePalette = 'primary';
  public enableMeridian = false;
  public get localTime():string {
    if(this.dateControl.value){
      return moment(this.dateControl.value).toLocaleString();
    }else{
      return "";
    }
  }

}
