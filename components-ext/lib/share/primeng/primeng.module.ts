import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PickListModule } from './picklist/picklist';
import { TreeModule } from './tree/tree';

const MODULES = [TreeModule, PickListModule];

export { PickListModule } from './picklist/picklist';
export { TreeModule } from './tree/tree';

const COMPONENTS = [];
// endregion

// pipes
const PIPES = [];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ...COMPONENTS,
        ...PIPES
    ],
    exports: [
        ...COMPONENTS,
        ...PIPES,
        ...MODULES
    ],
    providers: [

    ]
})
export class PrimengRootModule { }



@NgModule({ exports: MODULES })
export class PrimengModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: PrimengRootModule };
    }
}