import { Component } from '@angular/core';

@Component({
  selector: 'yzt-demo-tabs-operation',
  template: `
    <yzt-tabset [nzType]="'card'">
      <yzt-tab *ngFor="let tab of tabs">
        <ng-template #nzTabHeading>
          <div>
            {{tab.name}}
            <i class="anticon anticon-cross" (click)="closeTab(tab)"></i>
          </div>
        </ng-template>
        <span>Content of {{tab.name}}</span>
      </yzt-tab>
    </yzt-tabset>`,
  styles  : []
})
export class YztDemoTabsOperationComponent {
  tabs = [
    {
      name: 'Tab 1'
    },
    {
      name: 'Tab 2'
    }
  ];

  closeTab(tab) {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  newTab() {
    this.tabs.push({
      name: 'New Tab'
    });
  }
}

