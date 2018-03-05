import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YztCustomModule } from '../../../custom-components/lib/yzt-custom.module';
import { NgZorroAntdModule } from '../../../components/ng-zorro-antd.module';
import { NzCodeBoxModule } from '../../share/nz-codebox/nz-codebox.module';
import { YztDemoAbnormalSelecttBasicComponent } from './yzt-demo-abnormal-select-basic.component';
import { YztDemoAbnormalSelectComponent } from './yzt-demo-abnormal-select.component';
import { YztDemoAbnormalSelectRoutingModule } from './yzt-demo-abnormal-select.routing.module';

@NgModule({
	declarations:[
		YztDemoAbnormalSelectComponent,
		YztDemoAbnormalSelecttBasicComponent
	],
	imports: [
		NgZorroAntdModule,
		YztCustomModule,
		NzCodeBoxModule,
		YztDemoAbnormalSelectRoutingModule,
		CommonModule,
		FormsModule
	]
})
export class YztDemoAbnormalSelectModule { }
