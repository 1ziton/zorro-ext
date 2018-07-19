import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'nz-demo-yzt-viewer-basic',
  template: `
  <div id="galley" yzt-viewer>
      <ul class="pictures" #content>
          <li><img name="./assets/custom-img/viewerImg/tibet-1.jpg" src="./assets/custom-img/viewerImg/thumbnails/tibet-1.jpg" alt="Cuo Na Lake"></li>
          <li><img name="./assets/custom-img/viewerImg/tibet-2.jpg" src="./assets/custom-img/viewerImg/thumbnails/tibet-2.jpg" alt="Tibetan Plateau"></li>
          <li><img name="./assets/custom-img/viewerImg/tibet-3.jpg" src="./assets/custom-img/viewerImg/thumbnails/tibet-3.jpg" alt="Jokhang Temple"></li>
          <li><img name="./assets/custom-img/viewerImg/tibet-4.jpg" src="./assets/custom-img/viewerImg/thumbnails/tibet-4.jpg" alt="Potala Palace 1"></li>
          <li><img name="./assets/custom-img/viewerImg/tibet-5.jpg" src="./assets/custom-img/viewerImg/thumbnails/tibet-5.jpg" alt="Potala Palace 2"></li>
      </ul>
  </div>
  `,
  styles: [`
      .pictures {
        margin: 0;
        padding: 0;
        height: 200px;
        list-style: none;
      }

    .pictures > li {
        float: left;
        width: 70px;
        height: 70px;
        margin: 0 -1px -1px 0;
        border: 1px solid transparent;
        overflow: hidden;
    }

    .pictures > li > img {
        width: 100%;
        cursor: -webkit-zoom-in;
        cursor: zoom-in;
    }
  `]
})
export class NzDemoYztViewerBasicComponent {}
