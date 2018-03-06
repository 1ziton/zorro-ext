import { ObserversModule } from '@angular/cdk/observers';
// import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YztTabComponent } from "./nz-tab.component";
import { YztTabSetComponent } from "./nz-tabset.component";
import { YztTabsNavComponent } from "./nz-tabs-nav.component";
import { YztTabLabelDirective } from "./nz-tab-label.directive";
import { YztTabsInkBarDirective } from "./nz-tabs-ink-bar.directive";
import { YztTabBodyComponent } from "./nz-tab-body.component";


@NgModule({
  declarations: [ YztTabComponent, YztTabSetComponent, YztTabsNavComponent, YztTabLabelDirective, YztTabsInkBarDirective, YztTabBodyComponent ],
  exports     : [ YztTabComponent, YztTabSetComponent, YztTabsNavComponent, YztTabLabelDirective, YztTabsInkBarDirective, YztTabBodyComponent ],
  imports     : [ CommonModule, ObserversModule ]
})
export class YztTabsModule {
}
