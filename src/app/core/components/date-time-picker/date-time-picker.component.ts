import { SelectionChange } from '@angular/cdk/collections';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import * as dayjs from 'dayjs';
import * as moment from 'moment'
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone'
import { DayjsTimezone } from 'dayjs';


export class DateTimeControls {
  dateTimeLocal = new FormControl();
  dateLocal = new FormControl();
  timeLocal = new FormControl();
}
const MiniSecondsInOneYear = 365 * 24 * 3600 * 1000;

@Component({
  selector: 'date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DateTimePickerComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DateTimePickerComponent
    }]

})
export class DateTimePickerComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  constructor(
    protected formBuilder: FormBuilder,
  ) { }

  @Input() allowBreak: boolean = true;
  @Input() labelDate: string = null;
  @Input() labelTime: string = null;
  @Input() ariaLabelDate: string = null;
  @Input() ariaLabelTime: string = null;
  @Input() disabled: boolean = false;
  @Output() dateTimeChange: EventEmitter<Date> = new EventEmitter<Date>();
  private touched = false;
  public isDisabled = false;
  public dateTimeValue: Date;
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
          if (dayjs(date).isValid()) {
            console.log(date);
            this.dateTimeChange.emit(date);
          }
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

  private updateDateValue(date: Date) {
    this.formControls.dateLocal.setValue(dayjs(date).startOf('day').toDate());
    this.formControls.timeLocal.setValue(dayjs(date).format("hh:mm"));
    this.onChange(date);
    this.markAsTouched();
  }
  //#endregion

  //#region ControlValueAccessor Interface
  // ControlValueAccessor:writeValue
  public writeValue(date: Date) {
    this.updateDateValue(date);
  }

  // ControlValueAccessor:registerOnChange
  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // ControlValueAccessor:registerOnTouched
  public markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  // ControlValueAccessor:registerOnTouched
  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  // ControlValueAccessor:setDisabledState
  public setDisabledState?(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  private onChange(date: Date) { };

  private onTouched() { };
  //#endregion

  //#region Validator Interface
  // Validator:validate
  public validate(control: AbstractControl): ValidationErrors {
    return null;
  }
  //#endregion
}
