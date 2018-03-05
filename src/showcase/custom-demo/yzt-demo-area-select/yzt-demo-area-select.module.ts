import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YztCustomModule } from '../../../custom-components/lib/yzt-custom.module';
import { NgZorroAntdModule } from '../../../components/ng-zorro-antd.module';
import { NzCodeBoxModule } from '../../share/nz-codebox/nz-codebox.module';
import { YztAreaSelectBasicDemoComponent } from './yzt-demo-area-select-basic.component';
import { YztDemoAreaSelectComponent } from './yzt-demo-area-select.component';
import { YztDemoAreaSelectRoutingModule } from './yzt-demo-area-select.routing.module';

@NgModule({
	declarations:[
		YztDemoAreaSelectComponent,
		YztAreaSelectBasicDemoComponent
	],
	imports: [
		NgZorroAntdModule,
		YztCustomModule,
		NzCodeBoxModule,
		YztDemoAreaSelectRoutingModule,
		CommonModule,
		FormsModule
	]
})
export class YztAreaSelectDemoModule { }
