import { Component, OnInit } from '@angular/core';

export interface IHash<TValue> {
  [index: string]: TValue;
}

export class ErrorResult {
  message: string;
  messageDetail: string;
}

@Component({
  selector: 'app-i-hash',
  templateUrl: './i-hash.component.html',
  styleUrls: ['./i-hash.component.scss']
})
export class IHashComponent implements OnInit {

  constructor() { }
  failedResults: IHash<ErrorResult> = {};

  ngOnInit(): void {
    this.failedResults["one"] = <ErrorResult>{
      message:"message1",
      messageDetail:"messageDetail1"
    };
    this.failedResults["two"] = <ErrorResult>{
      message:"message2",
      messageDetail:"messageDetail2"
    };

    for(let key in this.failedResults){
      console.log(this.failedResults[key].message + " "+ this.failedResults[key].messageDetail );
    }
  }
}
