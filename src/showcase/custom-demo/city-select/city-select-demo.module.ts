import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {JsonpModule} from '@angular/http';


import {NzCodeBoxModule} from '../../share/nz-codebox/nz-codebox.module';
import {YztCustomModule} from '../../../custom-components/lib/yzt-custom.module';
import {CitySelectDemoRoutingModule} from './city-select-demo.routing.module';
import {CitySelectDemoComponent} from './city-select-demo.component';
import {CitySelectDemoBasicComponent} from './city-select-demo-basic.component';


@NgModule({
  imports: [CitySelectDemoRoutingModule, CommonModule, NzCodeBoxModule, YztCustomModule, FormsModule, JsonpModule],
  declarations: [CitySelectDemoComponent, CitySelectDemoBasicComponent]
})
export class CitySelectDemoModule {

}
