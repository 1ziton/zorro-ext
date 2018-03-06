import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'yzt-tabs-demo-basic',
  template: `
    <yzt-tabset>
      <yzt-tab *ngFor="let tab of tabs">
        <ng-template #nzTabHeading>
          {{tab.name}}
        </ng-template>
        <span>{{tab.content}}</span>
      </yzt-tab>
    </yzt-tabset>`,
  styles: []
})
export class YztTabsDemoBasicComponent implements OnInit {
  tabs = [
    {
      name: 'Tab 1',
      content: 'Content of Tab Pane 1'
    },
    {
      name: 'Tab 2',
      content: 'Content of Tab Pane 2'
    },
    {
      name: 'Tab 3',
      content: 'Content of Tab Pane 3'
    }
  ];

  ngOnInit() {
    setTimeout(_ => {
      this.tabs[0].content = 'Change Content';
    }, 10000);
  }

}


