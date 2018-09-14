/**
 * Created by giscafer on 2017/12/09
 */
import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'yzt-loading',
    templateUrl: './yzt-loading.component.html',
    styleUrls: ['./yzt-loading.component.scss']
})
export class YztLoadingComponent {
    @Input() fullscreen: boolean = true;
    @Input() message: string = "加载中…";
    _state: boolean = false;

    @Input()
    state(value: boolean) {
        this.renderContent(value, this._state);
        this._state = value;
    }
    /**
     * 如果外层有滚动条loading的时候禁用
     * @param newer 
     * @param older 
     */
    renderContent(newer, older) {
        let elHTML = document.querySelector('html');
        let htmlOverflow = document.querySelector('html').style.overflow;
        if (newer !== older && newer === true && elHTML.scrollHeight !== window.innerHeight && this.fullscreen) {
            elHTML.style.overflow = 'hidden';
        } else if (elHTML.style.overflow !== htmlOverflow && this.fullscreen) {
            elHTML.style.overflow = htmlOverflow;
        }
    }
}


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        YztLoadingComponent
    ],
    exports: [YztLoadingComponent]
})
export class YztLoadingModule { }