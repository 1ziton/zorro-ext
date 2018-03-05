// tslint:disable:ordered-imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from '../../../../index.showcase';
import { NzCodeBoxModule } from '../../share/nz-codebox/nz-codebox.module';

import { YztDemoUploadComponent } from './yzt-demo-upload.component';
import { YztDemoUploadRoutingModule } from './yzt-demo-upload.routing.module';
import { YztDemoUploadBasicComponent } from './yzt-demo-upload-basic.component';
import { YztDemoUploadAvatarComponent } from './yzt-demo-upload-avatar.component';
import { YztDemoUploadFileListComponent } from './yzt-demo-upload-file-list.component';
import { YztDemoUploadPictureCardComponent } from './yzt-demo-upload-picture-card.component';
import { YztDemoUploadFilterComponent } from './yzt-demo-upload-filter.component';
import { YztDemoUploadPictureStyleComponent } from './yzt-demo-upload-picture-style.component';
import { YztDemoUploadDragComponent } from './yzt-demo-upload-drag.component';
import { YztDemoUploadManuallyComponent } from './yzt-demo-upload-manually.component';
import { YztUploadModule } from '../../../custom-components/lib/yzt-custom.module';

@NgModule({
  imports     : [ YztDemoUploadRoutingModule, CommonModule, NzCodeBoxModule,YztUploadModule, NgZorroAntdModule, FormsModule ],
  declarations: [ YztDemoUploadComponent,
                  YztDemoUploadBasicComponent,
                  YztDemoUploadAvatarComponent,
                  YztDemoUploadFileListComponent,
                  YztDemoUploadPictureCardComponent,
                  YztDemoUploadFilterComponent,
                  YztDemoUploadPictureStyleComponent,
                  YztDemoUploadDragComponent,
                  YztDemoUploadManuallyComponent
                ]
})
export class YztDemoUploadModule {

}
