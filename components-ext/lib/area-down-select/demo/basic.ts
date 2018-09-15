import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-area-down-select-basic',
  template: `
    <yzt-area-down [(ngModel)]="areaId" placeholder="请输入目的地"></yzt-area-down>
    <span>{{areaId}}</span>
  `
})
export class NzDemoAreaDownSelectBasicComponent {
  areaId = "";

  constructor() { }
}
