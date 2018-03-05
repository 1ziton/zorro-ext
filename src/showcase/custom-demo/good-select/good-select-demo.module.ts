import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { GoodSelectDemoRoutingModule } from './good-select-demo.routing.module';
import { NzCodeBoxModule } from '../../share/nz-codebox/nz-codebox.module';
import { YztCustomModule } from '../../../custom-components/lib/yzt-custom.module';
import { GoodSelectDemoComponent } from './good-select-demo.component';

import { GoodSelectDemoBasicComponent } from './good-select-demo-basic.component';
import { GoodSelectDemoMultipleComponent } from './good-select-demo-multiple.component';
import { GoodSelectDemoTemplateComponent } from './good-select-demo-template.component';

@NgModule({
  imports     : [ GoodSelectDemoRoutingModule, CommonModule, NzCodeBoxModule, YztCustomModule, FormsModule, JsonpModule ],
  declarations: [ GoodSelectDemoBasicComponent, GoodSelectDemoComponent, GoodSelectDemoMultipleComponent, GoodSelectDemoTemplateComponent ]
})
export class GoodSelectDemoModule {

}
