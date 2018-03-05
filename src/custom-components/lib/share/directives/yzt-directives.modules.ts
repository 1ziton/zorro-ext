import { NgModule } from "@angular/core";
import { DragBoxDirective } from "./drag-box.directive";

@NgModule({
    declarations: [
        DragBoxDirective
    ],
    exports: [
        DragBoxDirective
    ]
})
export class DirectivesModule {}