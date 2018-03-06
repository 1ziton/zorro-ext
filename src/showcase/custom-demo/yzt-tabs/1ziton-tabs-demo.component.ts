import {Component, ViewEncapsulation} from '@angular/core';
@Component({
  selector     : 'yzt-tabs-demo',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './1ziton-tabs-demo.html',
  styleUrls    : [ ]
})
export class YztTabsDemoComponent {
  YztTabsDemoBasicCode = require('!!raw-loader!./1ziton-tabs-demo-basic.component');
  YztTabsDemoOperationCode = require('!!raw-loader!./1ziton-tabs-demo-operation.component');
  // GoodSelectDemoMultipleCode = require('!!raw-loader!./city-select-demo-multiple.component');
  // GoodSelectDemoTemplateCode = require('!!raw-loader!./city-select-demo-template.component');
}
