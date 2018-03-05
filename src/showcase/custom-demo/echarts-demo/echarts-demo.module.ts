import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YztCustomModule } from '../../../custom-components/lib/yzt-custom.module';
import { NgZorroAntdModule } from '../../../components/ng-zorro-antd.module';
import { EchartsDemoComponent } from './echarts-demo.component';
import { EchartsDemoMapComponent } from './echarts-demo-map.component';
import { EchartsDemoBarComponent } from './echarts-demo-bar.component';
import { EchartsDemoOptionsComponent } from './echarts-demo-options.component';
import { EchartsDemoPieComponent } from './echarts-demo-pie.component';
import { EchartsDemoClickComponent } from './echarts-demo-click.component';
import { EchartsDemoLineComponent } from './echarts-demo-line.component';
import { EchartsDemoRoutingModule } from './echarts-demo.routing.module';
import { EchartsModule } from '../../../custom-components/public_api';
import { NzCodeBoxModule } from '../../share/nz-codebox/nz-codebox.module';

@NgModule({
	declarations:[
		EchartsDemoComponent,
		EchartsDemoMapComponent,
		EchartsDemoBarComponent,
		EchartsDemoOptionsComponent,
		EchartsDemoPieComponent,
		EchartsDemoClickComponent,
		EchartsDemoLineComponent
	],
	imports: [
		NgZorroAntdModule,
		YztCustomModule,
		NzCodeBoxModule,
		EchartsDemoRoutingModule,
		CommonModule,
		FormsModule,
		EchartsModule
	]
})
export class EchartsDemoModule { }
