import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NzCodeBoxModule } from '../../share/nz-codebox/nz-codebox.module';
import { YztCustomModule } from '../../../custom-components/lib/yzt-custom.module';
import { CneeSelectDemoComponent } from "./cnee-select-demo.component";
import { CneeSelectDemoRoutingModule } from "./cnee-select-demo.routing.module";
import { CneeSelectDemoBasicComponent } from "./cnee-select-demo-basic.component";
import { CneeSelectDemoMultipleComponent } from "./cnee-select-demo-multiple.component";
import { CneeSelectDemoTemplateComponent } from "./cnee-select-demo-template.component";



@NgModule({
    imports: [CneeSelectDemoRoutingModule, CommonModule, NzCodeBoxModule, YztCustomModule, FormsModule, JsonpModule],
    declarations: [CneeSelectDemoComponent, CneeSelectDemoBasicComponent, CneeSelectDemoMultipleComponent, CneeSelectDemoTemplateComponent]
})
export class CneeSelectDemoModule { }
