import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-yzt-upload-multiple',
  template: `
  <yzt-upload [action]="uploadAction" type="picture-card" [source]="'ips'" [(fileList)]="file" [fileNum]="15"></yzt-upload>
  `
})
export class NzDemoYztUploadMultipleComponent {
  uploadAction = `https://uatcore.1ziton.com/api/core/upload`;
  file: any = [{id:"WXWBNfWtvh1KqQXy",
    name:"test.png",
    path:"WXWBNfWtvh1KqQXy.png",
    url:"http://yztfile.gz.bcebos.com/WXWBNfWtvh1KqQXy.png"}];
  constructor() { }

  ngOnInit() {
  }
}
