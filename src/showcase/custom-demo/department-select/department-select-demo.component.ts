import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'departement-select-demo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './department-select-demo.component.html',
  styleUrls: ['./department-select-demo.component.less']
})
export class DepartmentSelectDemoComponent {

    DepartmentSelectDemoBasicCode = require('!!raw-loader!./department-select-demo-basic.component');
    DepartmentSelectDemoValueTypeCode = require('!!raw-loader!./department-select-demo-valueType.component');
    DepartmentSelectDemoTemplateCode = require('!!raw-loader!./department-select-demo-template.component');

}
