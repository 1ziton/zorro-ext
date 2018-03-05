import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NzCodeBoxModule } from '../../share/nz-codebox/nz-codebox.module';
import { YztCustomModule } from '../../../custom-components/lib/yzt-custom.module';
import { ShipperSelectDemoComponent } from "./shipper-select-demo.component";
import { ShipperSelectDemoRoutingModule } from "./shipper-select-demo.routing.module";
import { ShipperSelectDemoBasicComponent } from "./shipper-select-demo-basic.component";
import { ShipperSelectDemoMultipleComponent } from "./shipper-select-demo-multiple.component";
import { ShipperSelectDemoTemplateComponent } from "./shipper-select-demo-template.component";



@NgModule({
    imports: [ShipperSelectDemoRoutingModule, CommonModule, NzCodeBoxModule, YztCustomModule, FormsModule, JsonpModule],
    declarations: [ShipperSelectDemoComponent, ShipperSelectDemoBasicComponent, ShipperSelectDemoMultipleComponent, ShipperSelectDemoTemplateComponent]
})
export class ShipperSelectDemoModule { }
