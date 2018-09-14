import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'nz-demo-abnormal-select-basic',
  template: `
    <yzt-abnormal [(ngModel)]="areaId" (ngModelChange)="getAreaId($event)"></yzt-abnormal>
  `
})
export class NzDemoAbnormalSelectBasicComponent {
  areaId = '';

  getAreaId(e) {
    console.log(e);
  }
}
