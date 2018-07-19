import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-area-down-select-valueType',
  template: `
    <area-down [(ngModel)]="areaId" valueType="fullObject" placeholder="请输入目的地"></area-down>
    <span>{{areaId | json}}</span>
  `
})
export class NzDemoAreaDownSelectValueTypeComponent {
  areaId = "";
}
