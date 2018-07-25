import { Component } from '@angular/core';
import { NzMessageService } from '../../../../components/ng-zorro-antd.module';

@Component({
  selector: 'nz-demo-shipper-select-basic',
  template: `
  <yzt-shipper [(ngModel)]="value"></yzt-shipper>
  <button style="margin-top: 5px;" nz-button [nzType]="'primary'" (click)="handle()">获取发货人编号</button>
  `
})
export class NzDemoShipperSelectBasicComponent {
  value: string = "";
  constructor(private _message: NzMessageService) { }

  ngOnInit() {
  }

  handle() {
      this._message.info('发货人编号值为：'+this.value);
  }
}
