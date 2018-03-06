import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UIGridDemoComponent } from './yzt-grid-demo.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: UIGridDemoComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class UIGridDemoRoutingModule {
}
