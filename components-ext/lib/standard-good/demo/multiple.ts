import { Component } from '@angular/core';
import { NzMessageService } from '../../../../components/ng-zorro-antd.module';

@Component({
  selector: 'nz-demo-standard-good-multiple',
  template: `
  <standard-good [(ngModel)]="value" valueType="object" [goodMode]="'multiple'"></standard-good>
  <button style="margin-top: 5px;" nz-button [nzType]="'primary'" (click)="handle()">获取品名编号数组</button>
  `
})
export class NzDemoStandardGoodMultipleComponent {
  value: any[] = [];
  constructor(private _message: NzMessageService) { }

  ngOnInit() {
  }
  handle() {
      this._message.info("品名编号数组为："+this.value);
  }
}
