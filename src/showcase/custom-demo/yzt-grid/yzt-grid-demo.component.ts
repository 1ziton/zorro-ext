import {Component, ViewEncapsulation} from '@angular/core';
@Component({
  selector     : 'yzt-grid-demo',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './yzt-grid-demo.html',
  styleUrls    : [
    './yzt-grid-demo.less',
  ]
})
export class UIGridDemoComponent {
  UIGridBasicCode = require('!!raw-loader!./yzt-grid-basic.component');
}
