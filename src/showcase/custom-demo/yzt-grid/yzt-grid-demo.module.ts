import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { UIGridDemoRoutingModule } from './yzt-grid-demo.routing.module';
import { NzCodeBoxModule } from '../../share/nz-codebox/nz-codebox.module';
import { YztCustomModule } from '../../../custom-components/lib/yzt-custom.module';
import { UIGridDemoComponent } from './yzt-grid-demo.component';

import { UIGridBasicComponent } from './yzt-grid-basic.component';
import { GridUtilService } from '../../../custom-components/lib/yzt-grid/share/grid-util.service';
import { RandomUserService } from '../../nz-demo-table/nz-demo-table-ajax.component';

@NgModule({
  imports     : [ UIGridDemoRoutingModule, CommonModule, NzCodeBoxModule, YztCustomModule, FormsModule, JsonpModule ],
  declarations: [ UIGridBasicComponent, UIGridDemoComponent ],
  providers: [GridUtilService, RandomUserService]
})
export class UIGridDemoModule {

}
