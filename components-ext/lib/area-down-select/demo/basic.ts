import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-area-down-select-basic',
  template: `
    <area-down [(ngModel)]="areaId" placeholder="请输入目的地"></area-down>
    <span>{{areaId}}</span>
  `
})
export class NzDemoAreaDownSelectBasicComponent {
  areaId = "";
  
  constructor() { }
}
