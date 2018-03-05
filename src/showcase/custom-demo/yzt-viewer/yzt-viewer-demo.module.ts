import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YztCustomModule } from '../../../custom-components/lib/yzt-custom.module';
import { NgZorroAntdModule } from '../../../components/ng-zorro-antd.module';
import { NzCodeBoxModule } from '../../share/nz-codebox/nz-codebox.module';
import { YZTViewerDemoComponent } from './yzt-viewer-demo.component';
import { YZTViewerBasicDemoComponent } from './yzt-viewer-basic-demo.component';
import { YZTViewerDemoRoutingModule } from './yzt-viewer-demo.routing.module';

@NgModule({
	declarations:[
		YZTViewerDemoComponent,
		YZTViewerBasicDemoComponent
	],
	imports: [
		NgZorroAntdModule,
		YztCustomModule,
		NzCodeBoxModule,
		YZTViewerDemoRoutingModule,
		CommonModule,
		FormsModule
	]
})
export class YZTViewerDemoModule { }
