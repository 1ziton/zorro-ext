import { Component } from '@angular/core';
import { NzMessageService } from '../../../../components/ng-zorro-antd.module';

@Component({
  selector: 'nz-demo-shipper-select-multiple',
  template: `
  <yzt-shipper [(ngModel)]="value" [optionMode]="'multiple'"></yzt-shipper>
  <button style="margin-top: 5px;" nz-button [nzType]="'primary'" (click)="handle()">获取发货人编号数组</button>
  `
})
export class NzDemoShipperSelectMultipleComponent {
  value: any[] = [];
  constructor(private _message: NzMessageService) { }

  ngOnInit() {
  }
  handle() {
      this._message.info("发货人编号数组为："+this.value);
  }
}
