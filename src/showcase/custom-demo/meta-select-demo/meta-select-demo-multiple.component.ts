import { Component, OnInit } from '@angular/core';
import { NzMessageService } from '../../../components/ng-zorro-antd.module';

@Component({
    selector: 'meta-select-demo-multiple',
    template: `
        <yzt-meta [(ngModel)]="value" [metaMode]="'multiple'" [valueType]="'id'"></yzt-meta>
        <button style="margin-top:10px" nz-button [nzType]="'primary'" (click)="handle()">获取字典id数组</button>
    `,
    styles: [``]
})
export class MetaSelectDemoMultipleComponent implements OnInit {

    value: string = "";
    constructor(private _message: NzMessageService) { }

    ngOnInit() {
    }

    handle() {
        this._message.info('字典对象为：'+this.value);
        console.log(this.value)
    }

}
