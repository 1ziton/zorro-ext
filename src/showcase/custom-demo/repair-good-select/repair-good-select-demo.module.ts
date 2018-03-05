import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { RepairGoodSelectRoutingModule } from './repair-good-select-demo.routing.module';
import { NzCodeBoxModule } from '../../share/nz-codebox/nz-codebox.module';
import { YztCustomModule } from '../../../custom-components/lib/yzt-custom.module';

import { RepairGoodSelectDemoComponent } from './repair-good-select-demo.component';
import { RepairGoodSelectBasicComponent } from './repair-good-select-basic.component';
import { RepairGoodSelectMultipleComponent } from './repair-good-select-multiple.component';
import { RepairGoodSelectTemplateComponent } from './repair-good-select-template.component';

@NgModule({
  imports     : [ RepairGoodSelectRoutingModule, CommonModule, NzCodeBoxModule, YztCustomModule, FormsModule, JsonpModule ],
  declarations: [ RepairGoodSelectBasicComponent, RepairGoodSelectDemoComponent, RepairGoodSelectMultipleComponent, RepairGoodSelectTemplateComponent ]
})
export class RepairGoodSelectModule {

}
