import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {JsonpModule} from '@angular/http';


import {NzCodeBoxModule} from '../../share/nz-codebox/nz-codebox.module';
import {YztCustomModule} from '../../../custom-components/lib/yzt-custom.module';
import { YztTabsDemoBasicComponent } from "./1ziton-tabs-demo-basic.component";
import { YztTabsDemoRoutingModule } from "./1ziton-tabs-demo.routing.module";
import { YztTabsDemoComponent } from "./1ziton-tabs-demo.component";
import { YztDemoTabsOperationComponent } from "./1ziton-tabs-demo-operation.component";




@NgModule({
  imports: [YztTabsDemoRoutingModule, CommonModule, NzCodeBoxModule, YztCustomModule, FormsModule, JsonpModule],
  declarations: [YztTabsDemoComponent, YztTabsDemoBasicComponent,YztDemoTabsOperationComponent]
})
export class YztTabsDemoModule {

}
