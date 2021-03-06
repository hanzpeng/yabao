import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import * as dayjs from 'dayjs';
import * as moment from 'moment'
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone'
import { DayjsTimezone } from 'dayjs';

dayjs.extend(utc)
dayjs.extend(timezone)


@Component({
  selector: 'app-date-test',
  templateUrl: './date-test.component.html',
  styleUrls: ['./date-test.component.scss']
})

export class DateTestComponent implements OnInit, AfterViewInit {
  @ViewChild("grid") grid: ElementRef;
  @ViewChild("grid2") grid2: ElementRef;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  addRow(label: string, value: any) {
    this.grid.nativeElement.innerHTML += `<div>${label}</div><div>${value}</div>`
  }
  add2(label: string, value: any) {
    this.grid2.nativeElement.innerHTML += `<div>${label}</div><div>${value}</div>`
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.nativeDateTest();
    this.dayjsTest();
  }

  dayjsTest() {
    let present = new Date();
    this.add2("present", present);
    this.add2("present", dayjs.utc(present));
    this.add2("dayjs.utc(present).add(2*24, 'hours')", dayjs.utc(present).add(2 * 24, 'hours'));
    const dayjsPresent = dayjs.utc(present);
    const twodayslater = dayjs.utc(present).add(2 * 24, 'hours');
    this.add2("dayjsPresent", dayjsPresent);
    this.add2("twodayslater", twodayslater);
    this.add2(" twodayslater.diff(dayjsPresent)", twodayslater.diff(dayjsPresent));
    this.add2(" twodayslater.diff(dayjsPresent,'days')", twodayslater.diff(dayjsPresent,'days'));
    this.add2(" twodayslater.diff(dayjsPresent,'hours')", twodayslater.diff(dayjsPresent,'hours'));


    this.add2("new Date(present.toString())", new Date(present.toString()));



    this.add2("(new Date('2021-10-12T05:05:15.027Z'))", (new Date('2021-10-12T05:05:15.027Z')));
    this.add2("(new Date('2021-10-12T05:05:15.027Z'.toString()))", (new Date('2021-10-12T05:05:15.027Z'.toString())));

    this.add2("new Date(present.toString()).valueOf()", new Date(present.toString()).valueOf())


    let now = dayjs();


    this.add2("dayjs()", dayjs().format("ddd MMMM D YYYY, h:mm A"));
    this.add2("TZ", dayjs().format("ddd MMMM D YYYY, h:mm A"));
    this.add2("test1", dayjs().second(0).tz("Pacific/Auckland").format("ddd MMMM D YYYY, h:mm A"));
    this.add2("test2", dayjs().tz("Pacific/Auckland").format("ddd MMMM D YYYY, h:mm A"));

    this.add2("dayjs()", dayjs());
    dayjs(now).endOf('day').toDate().valueOf()
    this.add2("dayjs(now)", dayjs(now));
    this.add2("dayjs(now).endOf('day')", dayjs(now).endOf('day'));
    this.add2("dayjs(now).endOf('day')", dayjs(now).endOf('day'));
    this.add2("dayjs(this.now).endOf('day').toDate().valueOf()", dayjs(now).endOf('day').toDate().valueOf());
    this.add2("dayjs(this.now).endOf('day').toDate().valueOf()", dayjs(now).endOf('day').toDate().valueOf());
    this.add2("dayjs(this.now).endOf('day').toDate().valueOf()", dayjs(now).endOf('day').toDate().valueOf());

    this.add2("(new Date('2021-10-12T05:05:15.027Z')).valueOf()", (new Date('2021-10-12T05:05:15.027Z')).valueOf());
    this.add2("(new Date('2021-10-12T05:05:15.027Z'))", (new Date('2021-10-12T05:05:15.027Z')));

    this.add2("dayjs().utc()", dayjs().utc());
    this.add2("dayjs().format()", dayjs().format());
    let x = dayjs("2021-10-13T23:10:25-07:00").toDate();
    this.add2("2021-10-13T00:10:25-07:00", x);
    this.add2("hours", x.getHours());

    this.add2("start of day", dayjs().startOf('day').toDate());


    this.add2("hours", new Date().getHours());

    this.add2("minutes", new Date().getMinutes());

    this.add2("new Date().toUTCString()", new Date().toUTCString());
    this.add2("moment().utc", moment().utc());
    this.add2("dayjs().utc", dayjs().utc());

    this.add2("moment.utc(moment().startOf('day')).format()", moment.utc(moment().startOf('day')).format());
    this.add2("dayjs.utc(dayjs().startOf('day')).format()", dayjs.utc(dayjs().startOf('day')).format());

  }

  nativeDateTest() {
    let now = new Date();
    let tomorrow = new Date(now.valueOf() + 24 * 3600 * 1000);

    this.addRow(
      "now",
      "new Date()"
    );

    this.addRow(
      "tomorrow",
      "new Date(now.valueOf() + 24*3600*1000)"
    );

    this.addRow(
      "tomorrow",
      tomorrow
    );

    this.addRow(
      "now.toISOString()",
      now.toISOString()
    );

    this.addRow(
      `new Date(${now.toISOString()})`,
      new Date(now.toISOString())
    );

    this.addRow(
      "now.toUTCString()",
      now.toUTCString()
    );

    this.addRow(
      "now",
      now
    );

    this.addRow(
      "now.toString()",
      now.toString()
    );

    this.addRow(
      "now.toLocaleString()",
      now.toLocaleString()
    );

    this.addRow(
      "now.toLocaleDateString()",
      now.toLocaleDateString()
    );

    this.addRow(
      "now.toLocaleTimeString()",
      now.toLocaleTimeString()
    );

    this.addRow(
      'tomorrow.toLocaleString("en-US")',
      tomorrow.toLocaleString("en-US")
    );

    this.addRow(
      'tomorrow.toLocaleString("en-US",{timeZone: "America/Los_Angeles"})',
      tomorrow.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    );

    this.addRow(
      'tomorrow.toLocaleString("en-US",{timeZone: "America/New_York"})',
      tomorrow.toLocaleString("en-US", { timeZone: "America/New_York" })
    );

    this.addRow(
      'tomorrow.toLocaleString("en-AU")',
      tomorrow.toLocaleString("en-AU")
    );

    this.addRow(
      'tomorrow.toLocaleString("zh")',
      tomorrow.toLocaleString("zh")
    );

    this.addRow(
      "now.valueOf() + 24 * 3600 * 1000)",
      now.valueOf() + 24 * 3600 * 1000
    );

    this.addRow(
      "new Date('2019-08-21T11:30:00-06:00')",
      new Date("2019-08-21T11:30:00-06:00")
    );

    this.addRow(
      "new Date(2019, 0, 2, 11, 30, 25, 10)",
      new Date(2019, 0, 2, 11, 30, 25, 10)
    );

    this.addRow(
      "JSON.stringify({mydate: tomorrow})",
      JSON.stringify({ mydate: tomorrow })
    );

    this.addRow(
      "typeof now",
      typeof now
    );

  }

}
