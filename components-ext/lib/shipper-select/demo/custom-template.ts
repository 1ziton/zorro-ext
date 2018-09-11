import { Component } from '@angular/core';
import { NzMessageService } from '../../../../components/ng-zorro-antd.module';

@Component({
  selector: 'nz-demo-shipper-select-custom-template',
  template: `
   <yzt-shipper [(ngModel)]="value" [customTemplate]="content"  [valueType]="'object'">
    <ng-template #content let-name="option.name" let-telephone="option.telephone">
      <div class="wrap">
        <span class="font-style border-right">{{name}}</span>
        <span class="font-style">{{telephone}}</span>
      </div>
    </ng-template>
  </yzt-shipper>
  <button style="margin-top: 5px;" nz-button [nzType]="'primary'" (click)="handle()">获取发货人编号</button>
`,
  styles: [`
      .border-right{
          border-right:1px solid #ECECEC;
          padding-right: 10px;
          margin-right: 10px;
      }
  `]
})
export class NzDemoShipperSelectCustomTemplateComponent {
  value: any;
  constructor(private _message: NzMessageService) { }

  ngOnInit() {
  }
  handle() {
    this._message.info('获取发货人编号为:' + this.value);
  }
}
