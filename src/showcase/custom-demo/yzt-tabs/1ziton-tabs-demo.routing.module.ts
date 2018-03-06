import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { YztTabsDemoComponent } from "./1ziton-tabs-demo.component";



@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: YztTabsDemoComponent}
  ])],
  exports: [RouterModule]
})
export class YztTabsDemoRoutingModule {
}
