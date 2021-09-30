//https://stackblitz.com/edit/demo-ngx-mat-datetime-picker?file=src%2Fapp%2Fapp.component.html
//https://www.npmjs.com/package/@angular-material-components/datetime-picker

import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
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
