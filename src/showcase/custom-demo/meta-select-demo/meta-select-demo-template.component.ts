import { Component, OnInit } from '@angular/core';
import { NzMessageService } from '../../../components/ng-zorro-antd.module';

@Component({
    selector: 'meta-select-demo-template',
    template: `
        <yzt-meta [(ngModel)]="value" [customTemplate]="content" [metaType]="'repair'">
            <ng-template #content let-name="label">
                <div class="wrap">
                <span class="font-style">{{name}}</span>
                </div>
            </ng-template>
        </yzt-meta>
        <button style="margin-top:10px" nz-button [nzType]="'primary'" (click)="handle()">获取字典对象</button>
    `,
    styles: [`
        .wrap {
            border-bottom: 1px solie #ccc;
        }
        .font-style {
            font-size: 20px;
        }
    `]
})
export class MetaSelectDemoTemplateComponent implements OnInit {

    value: string = "";
    constructor(private _message: NzMessageService) { }

    ngOnInit() {
    }

    handle() {
        this._message.info('字典对象为：'+this.value);
        console.log(this.value)
    }


}
