import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NzCodeBoxModule } from '../../share/nz-codebox/nz-codebox.module';
import { YztCustomModule } from '../../../custom-components/lib/yzt-custom.module';
import { MasterSelectDemoComponent } from "./master-select-demo.component";
import { MasterSelectDemoRoutingModule } from "./master-select-demo.routing.module";
import { MasterSelectDemoBasicComponent } from "./master-select-demo-basic.component";
import { MasterSelectDemoValueTypeComponent } from "./master-select-demo-valueType.component";
import { MasterSelectDemoTemplateComponent } from "./master-select-demo-template.component";
import { MasterSelectDemoValueFieldComponent } from "./master-select-demo-valueField.component";
import { MasterSelectDemoMixtureComponent } from "./master-select-demo-mixture.component";



@NgModule({
    imports: [MasterSelectDemoRoutingModule, CommonModule, NzCodeBoxModule, YztCustomModule, FormsModule, JsonpModule],
    declarations: [MasterSelectDemoComponent, MasterSelectDemoBasicComponent, MasterSelectDemoValueTypeComponent, MasterSelectDemoValueFieldComponent, MasterSelectDemoMixtureComponent, MasterSelectDemoTemplateComponent]
})
export class MasterSelectDemoModule { }
