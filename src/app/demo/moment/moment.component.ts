import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss']
})
export class MomentComponent implements OnInit {

  moment: moment.Moment;
  momentUtc: moment.Moment;
  momentString: string;
  momentUtcString: string;
  momentLocalString: string;
  momentUtcLocalString: string;
  constructor() { }

  ngOnInit(): void {
    this.moment = moment();
    this.momentUtc = moment.utc();
    this.momentString = this.moment.toString();
    this.momentUtcString = this.momentUtc.toString();
    this.momentLocalString = this.moment.toLocaleString();
    this.momentUtcLocalString = this.momentUtc.toLocaleString();
  }
}
