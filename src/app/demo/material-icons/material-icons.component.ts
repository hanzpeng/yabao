import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-icons',
  templateUrl: './material-icons.component.html',
  styleUrls: ['./material-icons.component.scss']
})
export class MaterialIconsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public getShieldClass(processing: string): string {
    if (processing === 'a')
      return 'error-shield';
    else if (processing === 'b')
      return 'warning-shield';
    else
      return "";
  }

}
