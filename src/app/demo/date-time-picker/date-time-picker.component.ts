import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

export class RequestPendingFormControls {
  startedAtLocal = new FormControl();
  startedAtDateLocal = new FormControl();
  startedAtTimeLocal = new FormControl();
}

class UtilitiesService {
  static combineDateAndTime(date: Date, time: string): Date {
    // Try to parse the value to a time
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

const HOUR = 1000 * 3600;
const DAY = 24 * HOUR;

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit, OnDestroy {

  constructor(
    protected changeRef: ChangeDetectorRef,
    protected formBuilder: FormBuilder,
  ) { }

  ariaLabelStartDate: string;
  ariaLabelStartTime: string;

  public formGroup: FormGroup;
  public formControls = new RequestPendingFormControls();
  public dateLimits = {
    startDateMin: new Date(),
    startDateMax: new Date(),
  };
  valueChangeSubscriptions = new Array<Subscription>();
  ngOnInit(): void {
    let now = new Date();
    this.dateLimits.startDateMin = new Date(now.valueOf() - 2 * DAY);
    this.dateLimits.startDateMax = new Date(now.valueOf() + 10 * DAY);
    this.formGroup = this.formBuilder.group(this.formControls);
    this.attachValueChangesSubscribers();
    this.changeRef.markForCheck();

  }
  ngOnDestroy(): void {
    this.valueChangeSubscriptions?.forEach(sub => sub.unsubscribe());
  }

  private attachValueChangesSubscribers() {
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
    this.formControls.startedAtDateLocal.markAsPristine();
    this.formControls.startedAtDateLocal.markAsUntouched();
    let valueChangesList = [];
    valueChangesList.push(this.formControls.startedAtDateLocal.valueChanges);
    valueChangesList.push(this.formControls.startedAtTimeLocal.valueChanges);
    valueChangesList.forEach(valueChanges => {
      let subscription = valueChanges.subscribe(() => {
        if (this.formControls?.startedAtDateLocal?.value && this.formControls?.startedAtTimeLocal?.value) {
          let date: Date = new Date(this.formControls?.startedAtDateLocal.value);
          let time: string = this.formControls?.startedAtTimeLocal.value;
          UtilitiesService.combineDateAndTime(date, time);
          this.formControls?.startedAtLocal.markAsTouched();
          this.formControls?.startedAtLocal.setValue(date);
          this.changeRef.markForCheck();
        }
      });
      this.valueChangeSubscriptions.push(subscription);
    });
  };
}
