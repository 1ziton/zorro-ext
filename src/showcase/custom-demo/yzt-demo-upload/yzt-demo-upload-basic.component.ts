import { Component } from '@angular/core';
import { YztUploadFile } from '../../../custom-components/lib/yzt-custom.module';

@Component({
  selector: 'yzt-demo-upload-basic',
  template: `
  <yzt-upload [(fileList)]="fileList" ></yzt-upload>
  `
})
export class YztDemoUploadBasicComponent {

  fileList: YztUploadFile[] = [];
}
