import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-enum-test',
  templateUrl: './enum-test.component.html',
  styleUrls: ['./enum-test.component.scss']
})
export class EnumTestComponent implements OnInit, AfterViewInit {

  constructor() { }
  @ViewChild("grid") grid: ElementRef;
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.displayContent();
  }
  addRow(label: string, value: any) {
    this.grid.nativeElement.innerHTML += `<div>${label}</div><div>${value}</div>`
  }

  displayContent() {
      this.addRow("expression","value");
  }

}
