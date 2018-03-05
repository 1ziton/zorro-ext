import { CommonModule, } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { YztUploadComponent } from "./yzt-upload.component";

import { NgZorroAntdModule } from "../../../components/ng-zorro-antd.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule
    ],
    declarations: [
        YztUploadComponent
    ],
    exports: [YztUploadComponent]
})
export class YztUploadModule { }