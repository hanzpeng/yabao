//https://stackoverflow.com/questions/62767985/how-can-i-customize-date-and-time-format-in-ngx-mat-datetime-picker
//https://gist.githubusercontent.com/nandhakumargdr/635af05419793e15f3758656ddd1ef39/raw/337cf9ad8157c5e8ebd1de02437b2d56b7024f0b/CustomNgxDatetimeAdapter.ts

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import { NgxMatDateAdapter, NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { CustomNgxDatetimeAdapter } from './custom-adapter';
import * as moment from 'moment';

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS'
  },
  display: {
    dateInput: 'ddd MMM DD YYYY h:mm A Z',
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
    { provide: NgxMatDateAdapter, useClass: CustomNgxDatetimeAdapter, deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
})
export class DateTimeComponent implements OnInit {
  constructor() { }

  _hanzDate = new Date(2021, 1, 3, 4, 5, 6)

  ngOnInit() {
    // this.date = moment(new Date(2021, 9, 4, 5, 6, 7));
  }

  get hanzDate() {
    return this._hanzDate;
  }
  set hanzDate(value){
    this._hanzDate = value;
    alert(this._hanzDate);
  }

  public dateControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public disabled = false;
  public color: ThemePalette = 'primary';
  public enableMeridian = false;
  public get localTime(): string {
    if (this.dateControl.value) {
      return moment(this.dateControl.value).toLocaleString();
    } else {
      return "";
    }
  }
}
