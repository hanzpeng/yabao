import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-type-script',
  templateUrl: './type-script.component.html',
  styleUrls: ['./type-script.component.scss']
})
export class TypeScriptComponent implements OnInit, AfterViewInit {
  constructor() { }
  ngOnInit(): void {
  }
  ngAfterViewInit():void{
    this.tests();
  }
  @ViewChild("grid") grid: ElementRef;
  addRow(label: string, value: any) {
    this.grid.nativeElement.innerHTML += `<div>${label}</div><div>${value}</div>`
  }
  tests() {
    this.addRow("expression", "value");
  }

}
