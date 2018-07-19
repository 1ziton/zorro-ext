import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-area-down-select-custom-template',
  template: `
    <area-down [(ngModel)]="areaId" [customTemplate]="Tmpl" dropdownStyle="120%" placeholder="请输入目的地">
      <ng-template #Tmpl let-name="option.name" let-code="option.code" let-index="index">
          <div class="area-wrap custom-select-wrap">
              <div class="area-title custom-select-title" *ngIf="index===0">
                  <span>发货人名称</span>
                  <span>联系人手机</span>
              </div>
              <div class="area-style custom-select-content">
                  <span title="{{name}}">{{name}}</span>
                  <span title="{{code}}">{{code}}</span>
              </div>
          </div>
      </ng-template>
    </area-down>
    <span>{{areaId | json}}</span>
  `,
  styles: [
    `
    .area-wrap {
        span {
            padding: 3px 5px;
            display: inline-block;
            width: 100px;
            text-align: left;
        }
        .area-title {
            span {
                font-weight: bold;
            }
            span:first-child {
                width: 120px;
            }
        }
        .area-style {
            span {
                word-break: break-all;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            span:first-child {
                width: 120px;
            }
        }
    }
    .custom-select-wrap {
        margin: -5px -12px;
        .custom-select-title, .custom-select-content {
            padding: 5px 12px;
        }
        .custom-select-title {
            padding-bottom: 0;
            background-color: #fff;
        }
    }
    `
  ]
})
export class NzDemoAreaDownSelectCustomTemplateComponent {
  areaId = "";
}
