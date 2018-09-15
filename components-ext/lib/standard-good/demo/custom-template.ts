import { Component } from '@angular/core';
import { NzMessageService } from '../../../../components/ng-zorro-antd.module';

@Component({
  selector: 'nz-demo-standard-good-custom-template',
  template: `
   <yzt-standard-good [(ngModel)]="value" [customTemplate]="content"  [valueType]="'object'">
    <ng-template #content let-name="option.name" let-mobile="option.mobile">
      <div class="wrap">
        <span class="font-style border-right">{{name}}</span>
        <span class="font-style">{{mobile}}</span>
      </div>
    </ng-template>
  </yzt-standard-good>
  <button style="margin-top: 5px;" nz-button [nzType]="'primary'" (click)="handle()">获取品名编号</button>
`,
  styles: [`
      .border-right{
          border-right:1px solid #ECECEC;
          padding-right: 10px;
          margin-right: 10px;
      }
  `]
})
export class NzDemoStandardGoodCustomTemplateComponent {
  value: any;
  constructor(private _message: NzMessageService) { }

  ngOnInit() {
  }
  handle() {
    this._message.info('获取品名编号为:' + this.value);
  }
}
