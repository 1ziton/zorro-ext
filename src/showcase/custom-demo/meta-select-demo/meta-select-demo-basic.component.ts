import { Component, OnInit } from '@angular/core';
import { NzMessageService } from '../../../components/ng-zorro-antd.module';

@Component({
  selector: 'meta-select-demo-basic',
  template: `
  <yzt-meta [(ngModel)]="value"></yzt-meta>
  <button style="margin-top:10px" nz-button [nzType]="'primary'" (click)="handle()">获取字典对象</button>
`,
  styles: []
})
export class MetaSelectDemoBasicComponent implements OnInit {

    value: string = "";
    constructor(private _message: NzMessageService) { }

    ngOnInit() {
    }

    handle() {
        this._message.info('字典对象为：'+this.value);
        console.log(this.value)
    }

}
