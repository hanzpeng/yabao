import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

export class DateTimeControls {
  dateTimeLocal = new FormControl();
  dateLocal = new FormControl();
  timeLocal = new FormControl();
}
const MiniSecondsInOneYear = 365 * 24 * 3600 * 1000;

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit, OnDestroy {
  constructor(
    protected formBuilder: FormBuilder,
  ) { }

  labelDate: string = "Date";
  labelTime: string = "Time";
  ariaLabelDate: string = "Date";
  ariaLabelTime: string = "Time";

  public formGroup: FormGroup;
  public formControls = new DateTimeControls();
  public dateLimits = {
    dateMin: new Date(0),
    dateMax: new Date(100 * MiniSecondsInOneYear),
  };
  valueChangeSubscriptions = new Array<Subscription>();
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(this.formControls);
    this.attachValueChangesSubscribers();
  }
  ngOnDestroy(): void {
    this.valueChangeSubscriptions?.forEach(sub => sub.unsubscribe());
  }
  private attachValueChangesSubscribers() {
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
    this.formControls.dateLocal.markAsPristine();
    this.formControls.dateLocal.markAsUntouched();
    this.formControls.timeLocal.markAsPristine();
    this.formControls.timeLocal.markAsUntouched();
    this.formControls.dateTimeLocal.markAsPristine();
    this.formControls.dateTimeLocal.markAsUntouched();
    let valueChangesList = [];
    valueChangesList.push(this.formControls.dateLocal.valueChanges);
    valueChangesList.push(this.formControls.timeLocal.valueChanges);
    valueChangesList.forEach(valueChanges => {
      let subscription = valueChanges.subscribe(() => {
        let time: string = this.formControls?.timeLocal?.value ?
          this.formControls?.timeLocal?.value :
          "0:0";
        if (this.formControls?.dateLocal?.value) {
          let date: Date = new Date(this.formControls?.dateLocal.value);
          this.combineDateAndTime(date, time);
          this.formControls?.dateTimeLocal.markAsTouched();
          this.formControls?.dateTimeLocal.setValue(date);
        }
      });
      this.valueChangeSubscriptions.push(subscription);
    });
  };
  private combineDateAndTime(date: Date, time: string): Date {
    let colonIndex: number = time ? time.indexOf(':') : -1;
    if (colonIndex > -1) {
      let hour: number = +time.substring(0, colonIndex);
      let minute: number = +time.substring(colonIndex + 1, time.length);
      date.setHours(hour);
      date.setMinutes(minute);
    }
    return date;
  }
}
