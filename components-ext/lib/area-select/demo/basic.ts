import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'nz-demo-area-select-basic',
  template: `
    <yzt-area [(ngModel)]="areaId" placeholder="请选择目的地" (ngModelChange)="getAreaId($event)"></yzt-area>
  `
})
export class NzDemoAreaSelectBasicComponent {
  areaId = '';

  getAreaId(e) {
    console.log(e);
  }
}
