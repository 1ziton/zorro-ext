import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-yzt-loading-basic',
  template: `
  <div class="mock-style">
      <div class="inside">
        <yzt-loading [state]="true" [fullscreen]="false"></yzt-loading>
      </div>
  </div>
  `,
  styles: [`
    .mock-style {
      width: 300px;
      height: 300px;
      background: #ccc;
    }
    .inside {
      width: 200px;
      height: 200px;
      margin: 0 auto;
      background: #fff;
      position: relative;
    }
  `]
})
export class NzDemoYztLoadingBasicComponent {
  constructor() { }

  ngOnInit() {
  }
}
