import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-date-time-picker-test',
  templateUrl: './date-time-picker-test.component.html',
  styleUrls: ['./date-time-picker-test.component.scss']
})
export class DateTimePickerTestComponent implements OnInit {
  constructor() { }
  currentDateCtrl = new FormControl();
  currentDateValue: Date;

  ngOnInit(): void {
    let now = new Date();
    this.currentDateValue = now;
    this.currentDateCtrl.setValue(now);
  }

  dateTimeChange(newDate: Date) {
    this.currentDateValue = newDate;
  }
}
