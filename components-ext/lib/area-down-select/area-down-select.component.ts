import { Component, OnInit, Input, forwardRef, NgModule, TemplateRef, Output, EventEmitter, ViewChild, ViewContainerRef, ElementRef, ContentChild, SimpleChange } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from "@angular/forms";
import { CommonModule, NgForOfContext } from "@angular/common";
import { ApiService } from '../services/api.service';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { NgZorroAntdModule } from '../../../components/ng-zorro-antd.module';

export interface AreaInfo {
    mergerName: string;
    code: string;
    idBak?: string;
    mobile?: string;
    disabled?: boolean;
}

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AreaDownSelectComponent),
    multi: true
};
@Component({
    selector: `area-down`,
    template: `   
    <div class="area-down-select">
    <nz-select 
        class="area-down-nz-select"
        [nzServerSearch]="true"
        nzShowSearch
        [nzDropdownStyle]="_dropdownStyle"
        [style.width]="_width" 
        [nzPlaceHolder]="placeholder"
        [nzMode]="_nzMode"
        [nzAllowClear]="_allowClear"
        (nzOnSearch)="yztSearchChange($event)"
        (nzScrollToBottom)="yztScrollToBottom()"
        (nzOpenChange)="yztOpenChange($event)"
        [nzDisabled]="yztDisabled"
        [(ngModel)]="value">
        <ng-template [ngIf]="!_content">
            <ng-container *ngFor="let option of options; let i = index;">
                <nz-option
                    *ngIf="!loading"
                    [nzLabel]="option.mergerName"
                    [nzValue]="option"
                    [nzDisabled]="option.disabled">
                </nz-option>
            </ng-container>
            <nz-option *ngIf="loading" nzDisabled nzCustomContent>
            <i class="anticon anticon-loading anticon-spin loading-icon"></i> 加载中...
            </nz-option>
        </ng-template>
        <ng-template [ngIf]="_content">
            <ng-container *ngFor="let option of options; let i = index;">
                <nz-option
                    *ngIf="!loading"
                    nzCustomContent
                    [nzLabel]="option.name"
                    [nzValue]="option"
                    [nzDisabled]="option.disabled">
                    <ng-container [ngTemplateOutlet]="_content" [ngTemplateOutletContext]="{option:option, index: i}"></ng-container>
                </nz-option>
            </ng-container>
        </ng-template>
    </nz-select>
    <span
      role="close-icon"
      (click)="clearSelect($event)"
      class="ant-select-selection__clear close-icon"
      style="-webkit-user-select: none;"
      *ngIf="!_allowClear&&options.length">
    </span>
</div>
    `,
    styles: [`
    .area-down-select{
        position: relative;
    }
    .close-icon {
        opacity: 0;
        position: absolute;
        right: 20px;
        top: 50%;
        margin-top: -10px;
    }
    .close-icon:hover {
        opacity: 1;
    }
    .area-nz-select:hover +.close-icon {
        opacity: 1;
    }
    `],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class AreaDownSelectComponent implements ControlValueAccessor, OnInit {

    private onTouchedCallback: () => () => {};
    private onChangeCallback: (_: any) => () => {};

    
    options: Array<AreaInfo> = [];
    // 单选的时候传字符串，多选传数组
    _value: string;
    _width = "100%";
    _content: TemplateRef<any>;
    _allowClear = true;
    _nzMode = "default";
    // 下拉过滤含关键字选项，false为不过滤
    _filter = false;
    currentText = '';
    canQuery = true;
    // 限流
    queryDataStream = new Subject();
    queryData$: any;
    firstNum = 1;
    loading = false;
    yztDisabled = false;
    _dropdownStyle: { width: '100%' };

    @Input() areaName = "";
    @Input() placeholder = "请输入地址";
    @Input() rowsNum = 10;
    @Input() valueType = "";
    // 临时控制开单页重复传同一个字符串查询发货人
    @Input() isRepeatEcho = false;
    @Input() set dropdownStyle(value) {
        this._dropdownStyle = { width: value };
    }

    set value(v: any) {
        if (typeof v === 'string' && v.trim() === '' || !v) {
            this.canQuery = true;
            this.firstNum = 1;
            this.options = [];
            this.currentText = '';
            this.areaName = '';
            // this.queryData('', []);
            this.onChangeCallback(null);
            return;
        }
        this._value = v;
        // 双向绑定获取对象
        if (this.valueType === "object") {
            const { code, mergerName } = v;
            this.onChangeCallback({ value: code, label: mergerName });
        } else if (this.valueType === "fullObject") {
            const { code, mergerName, level, parentCode } = v;
            this.onChangeCallback({ value: code, label: mergerName, level: level, parentCode: parentCode });
        } else {
            this.onChangeCallback(v.code);
        }
    }

    get value(): any {
        return this._value;
    };

    @Input() set width(v: any) {
        const width = parseInt(v);
        this._width = Array.from(v).includes("%") ? `${v}%` : isNaN(width) ? this._width : `${width}px`;
    }

    @Input() set OptionMode(v) {
        this._nzMode = v;
        this._allowClear = v === "default" ? true : false;
    };

    @Input() set customTemplate(tpl: TemplateRef<any>) {
        console.log(tpl);
        if (tpl instanceof TemplateRef) {
            this._content = tpl;
        }
    }

    @Output() nzOpenChange: EventEmitter<any> = new EventEmitter();
    @Output() outOptions: EventEmitter<any> = new EventEmitter();

    constructor(private api: ApiService) {
    }

    ngOnInit() {
        // 限流
        this.queryData$ = this.queryDataStream
            .debounceTime(250)
            .subscribe(({ currentText, options }) => {
                this.queryData(currentText, options)
            });
    }

    ngOnChanges(changes: any) {
        if (changes.areaName && this.areaName) {
            this.firstNum = 1;
            this.loading = true;
            this.canQuery = true;
            this.queryData(this.areaName, [], true);
        }
    }

    ngOnDestroy() {
        this.queryData$.unsubscribe()
    }

    yztSearchChange(inputValue) {
        if (!inputValue) return;
        this.canQuery = true;
        this.currentText = inputValue;
        this.firstNum = 1;
        this.queryDataStream.next({currentText: inputValue, options: []});
    }

    yztScrollToBottom() {
        this.queryDataStream.next({ currentText: this.currentText, options: this.options })
    }

    yztOpenChange(nzOpen: boolean) {
        if (nzOpen) {
            // 当前ngModel有值时，下拉选择无内容时对当前值搜索一次
            if (!this.options.length || (this.options.length === 1 && this.options[0]['disabled'])) {
                this.canQuery = true;
                let keyword = this.value ? this.value.name : '';
                this.queryDataStream.next({ currentText: keyword, options: [] })
            }
        }
        this.nzOpenChange.emit(nzOpen)
    }

    /** 
     * 仅作清空多选选项
     */
    clearSelect($event?: MouseEvent): void {
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        this.options = [];
        this.value = '';
    }

    // 写入值
    writeValue(value: any) {
        if (!this.isRepeatEcho && value !== this._value) {
            this._value = value;
        }
    }

    // 注册变化处理事件
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // 注册触摸事件
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    /**
     * 查询数据
     * @param $event
     */
    queryData(searchText?: string, options?: Array<AreaInfo>, firstIn: boolean = false) {
        if (!this.canQuery) return;
        const areaName = searchText;
        let params;
        if (this.areaName) {
            params = [{ "page": this.firstNum, "size": this.rowsNum }, { level: 1, mergerName: this.areaName }];
        } else {
            params = [{ "page": this.firstNum, "size": this.rowsNum }, { level: 1, mergerName: areaName }];
        }
        this.api.getAreaPage(params).subscribe(json => {
            let content = json && json['content'] || {};
            let result = content['content'] || []

            this.options = options.concat(result);
            this.firstNum += 1;
            if (firstIn || this.areaName) {
                this.value = this.options[0];
            }
            this.loading = false;

            if (result.length < this.rowsNum) {
                this.options.push({ code: "empty", mergerName: "没有更多选项！", disabled: true });
                this.canQuery = false;
            }
        })
    }


}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
    ],
    declarations: [
        AreaDownSelectComponent
    ],
    exports: [AreaDownSelectComponent]
})
export class AreaDownSelectModule { }