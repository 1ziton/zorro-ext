import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MetaSelectDemoComponent } from './meta-select-demo.component';

@NgModule({
    imports: [ RouterModule.forChild([
      { path: '', component: MetaSelectDemoComponent }
    ]) ],
    exports: [ RouterModule ]
  })
export class MetaSelectDemoRoutingModule { }
