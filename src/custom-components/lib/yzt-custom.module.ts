// ---------------------------------------------------------
// | Imports
// ---------------------------------------------------------

// Common of angular
import { ModuleWithProviders, NgModule } from '@angular/core';

// Services
import { API } from './services/api';

// Directives
import { DirectivesModule } from './share/directives/yzt-directives.modules';

// Tokens (eg. global services' config)
import { NzRootConfig } from '../../components/ng-zorro-antd.module';

// Modules
import { GoodSelectModule } from './good-select/good-select.component';
import { NgZorroAntdModule } from '../../components/ng-zorro-antd.module';
import { EchartsModule } from './echarts/echarts.component';
import { UIGridModule } from './yzt-grid/yzt-grid.component';
import { ShipperSelectModule } from "./shipper-select/shipper-select.component";
import { GridIconModule } from './yzt-grid/grid-icon.component';
import { YztUploadModule } from './upload/yzt-upload.module';
import { YZTViewerDirectiveModule } from './yzt-viewer/yzt-viewer.directive';
import { RepairGoodSelectModule } from './repair-goods-select/repair-goods-select.component';
import { CneeSelectModule } from "./cnee-select/cnee-select.component";
import { MasterSelectModule } from "./master-select/master-select.component";
import { AreaSelectModule } from './area-select/area-select.component';
import { AbnormalSelectModule } from './abnormal-select/abnormal-select.component';
import { DepartmentSelectModule } from './department-select/departement-select.component';
import { CitySelectModule } from './city-select/city-select.component';
import { MetaSelectModule } from './meta-select/meta-select.component';
// ---------------------------------------------------------
// | Exports
// ---------------------------------------------------------
// interface
export * from './upload/interface';

// Modules
export { GoodSelectModule } from './good-select/good-select.component';
export { NgZorroAntdModule } from '../../components/ng-zorro-antd.module';
export { EchartsModule } from './echarts/echarts.component';
export { UIGridModule } from './yzt-grid/yzt-grid.component';
export { ShipperSelectModule } from "./shipper-select/shipper-select.component";
export { GridIconModule } from './yzt-grid/grid-icon.component';
export { YztUploadModule } from './upload/yzt-upload.module';
export { YZTViewerDirectiveModule } from './yzt-viewer/yzt-viewer.directive';
export { RepairGoodSelectModule } from './repair-goods-select/repair-goods-select.component';
export { CneeSelectModule } from "./cnee-select/cnee-select.component";
export { MasterSelectModule } from "./master-select/master-select.component";
export { AreaSelectModule } from './area-select/area-select.component';
export { AbnormalSelectModule } from './abnormal-select/abnormal-select.component';
export { DepartmentSelectModule } from './department-select/departement-select.component';
export { CitySelectModule } from './city-select/city-select.component';

// Components

// Services
export { API } from './services/api';

// Tokens (eg. global services' config)
export { NzRootConfig } from '../../components/ng-zorro-antd.module';

// ---------------------------------------------------------
// | Root module
// ---------------------------------------------------------

@NgModule({
  exports: [
    NgZorroAntdModule,
    GoodSelectModule,
    EchartsModule,
    UIGridModule,
    ShipperSelectModule,
    RepairGoodSelectModule,
    GridIconModule,
    DirectivesModule,
    YztUploadModule,
    YZTViewerDirectiveModule,
    CneeSelectModule,
    MasterSelectModule,
    AbnormalSelectModule,
    AreaSelectModule,
    DepartmentSelectModule,
    MetaSelectModule,
    CitySelectModule
  ]
})
export class YztCustomModule {

  static forRoot(options?: NzRootConfig): ModuleWithProviders {
    return {
      ngModule: YztCustomModule,
      providers: [
        // Services
      ]
    };
  }
}
