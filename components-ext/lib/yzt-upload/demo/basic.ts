import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-yzt-upload-basic',
  template: `
  <yzt-upload multiple="false" [(fileList)]="file" [fileNum]="15"></yzt-upload>
  `
})
export class NzDemoYztUploadBasicComponent {
  file: any;
  constructor() { }

  ngOnInit() {
  }
}
