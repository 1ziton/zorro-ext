import { Component, OnInit } from '@angular/core';
import { NzMessageService } from '../../../components/ng-zorro-antd.module';

@Component({
  selector: 'department-select-demo-template',
  template: `
    <yzt-department [(ngModel)]="value" [customCompanyTemplate]="contentCompany" [customDepartmentTemplate]="contentDepartment">
        <ng-template #contentCompany let-name="compayName">
            <div class="wrap">
                <span class="font-style">{{name}}</span>
            </div>
        </ng-template>
        <ng-template #contentDepartment let-name="name">
            <div class="wrap">
                <span class="department-font-style">{{name}}</span>
            </div>
        </ng-template>
    </yzt-department>
    <button nz-button [nzType]="'primary'" (click)="handle()">获取开单网点对象</button>
`,
  styles: [`
    .wrap {
        border-bottom: 1px solie #ccc;
    }
    .font-style {
        font-size: 14px;
        color:#000;
        font-weight:bold;
    }
    .department-font-style {
        font-size: 14px;
        color:#ccc;
        margin-left:15px;
    }
  `]
})
export class DepartmentSelectDemoTemplateComponent implements OnInit {

    value: string = "";
    constructor(private _message: NzMessageService) { }

    ngOnInit() {
    }

    handle() {
        this._message.info('网点对象为：'+this.value);
        console.log(this.value)
    }


}
