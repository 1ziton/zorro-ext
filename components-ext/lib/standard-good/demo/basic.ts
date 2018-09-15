import { Component } from '@angular/core';
import { NzMessageService } from '../../../../components/ng-zorro-antd.module';

@Component({
  selector: 'nz-demo-standard-good-basic',
  template: `
  <yzt-standard-good [(ngModel)]="value"></yzt-standard-good>
  <button style="margin-top: 5px;" nz-button [nzType]="'primary'" (click)="handle()">获取品名编号</button>
  `
})
export class NzDemoStandardGoodBasicComponent {
  value: string = "";
  constructor(private _message: NzMessageService) { }

  ngOnInit() {
  }

  handle() {
      this._message.info('品名编号值为：'+this.value);
  }
}
