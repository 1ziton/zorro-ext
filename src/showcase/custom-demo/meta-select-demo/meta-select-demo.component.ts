import { Component } from '@angular/core';

@Component({
  selector: 'meta-select-demo',
  templateUrl: './meta-select-demo.component.html',
  styleUrls: ['./meta-select-demo.component.less']
})
export class MetaSelectDemoComponent  {

    MetaSelectDemoBasicCode = require('!!raw-loader!./meta-select-demo-basic.component');
    MetaSelectDemoMultipleCode = require('!!raw-loader!./meta-select-demo-multiple.component');
    MetaSelectDemoTemplateCode = require('!!raw-loader!./meta-select-demo-template.component');

}
