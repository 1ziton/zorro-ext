import { Component, OnInit, NgModule, forwardRef, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { NgZorroAntdModule } from '../../../../index.showcase';
import { API } from '../services/api';

export interface Meta {
    id: string;
    label?: string;
    name?: string;
    order?: string;
    type?: string;
    disabled?: boolean;
}

export interface DomOpt {
    id: string;
    label: string;
}
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MetaSelectComponent),
    multi: true
};

@Component({
    selector: 'yzt-meta',
    template: `
    <div class="meta-select">
        <nz-select 
            class="meta-nz-select"
            [style.width]="_width" 
            [nzPlaceHolder]="placeholder" 
            [nzMode]="_nzMode"
            [nzFilter]="_filter"
            [nzAllowClear]="_allowClear"
            [nzNotFoundContent]="_notFoundContent"
            (nzSearchChange)="yztSearchChange($event)"
            [(ngModel)]="value">
            <nz-option
                #domOpt
                *ngFor="let option of options"
                [nzLabel]="option.label"
                [nzValue]="option"
                [nzDisabled]="option.disabled">
                <ng-template *ngIf="_content" #nzOptionTemplate>
                    <ng-container #nzOptionCon [ngTemplateOutlet]="_content" [ngTemplateOutletContext]="option"></ng-container>
                </ng-template>
            </nz-option>
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
    .close-icon {
        opacity: 0;
        position: absolute;
        right: 20px;
        top: 50%;
    }
    .close-icon:hover {
        opacity: 1;
    }
    .meta-nz-select:hover +.close-icon {
        opacity: 1;
    }
    .meta-select {
        position: relative;
    }
    
    `],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
  })
export class MetaSelectComponent implements OnInit {

    @ViewChild("domOpt") domOpt: DomOpt;
    private onTouchedCallback: () => () => {};
    private onChangeCallback: (_: any) => () => {};

    options: Array<Meta> = [];
    // 单选的时候传字符串，多选传数组
    _value: string;
    _width = "100%";
    _content: TemplateRef<any>;
    _allowClear = true;
    _nzMode = "combobox";
    // 下拉过滤含关键字选项，false为不过滤
    _filter = true;
    currentText = '';
    canQuery = true;
    keyWordStream = new Subject<string>()
    keyWord$: any;
    _notFoundContent = "没有更多选项！";
    

    @Input() placeholder = "请选择";

    @Input() metaType = "abnormalHandleWay";
    // 需要获取的值类型
    @Input() valueType = "object";

    @Input() set metaMode(v) {
        this._nzMode = v;
        this._allowClear = v === "combobox" ? true : false;
    };

    // 设置属性，并触发监听器
    set value(v: any) {
        if (typeof v === 'string' && v.trim() === '' || !v)
            this.queryData([]);
        this._value = v;
        // 双向绑定获取对象
        if (this.valueType === "object") {
            this.onChangeCallback(v);
        } else {
            let id;
            let name;
            if(this._nzMode === 'multiple'){
                let idArr = [];
                v.forEach(item => {
                    idArr.push(item.id);
                });
                id = idArr || v;
            }else{
                name = v.label || v;
                id = v.id || v;
            }
            
            this.valueType === "id" ? this.onChangeCallback(id) : this.onChangeCallback(name);
        }
    }

    get value(): any {
        return this._value;
    };

    @Input() set width(v: any) {
        const width = parseInt(v);
        this._width = Array.from(v).includes("%") ? `${v}%` : isNaN(width) ? this._width : `${width}px`;
    }

    @Input() set customTemplate(tpl: TemplateRef<any>) {
        if (tpl instanceof TemplateRef) {
            this._content = tpl;
        }
    }

    @Output() openChange: EventEmitter<any> = new EventEmitter();
    @Output() outOptions: EventEmitter<any> = new EventEmitter();

    constructor(private api: API) {
    }

    ngOnInit() {
        this.queryData([]);

    }

    ngOnDestroy() {
    }

    yztSearchChange(event) {
        this.canQuery = true;
        this.currentText = event;
        this.keyWordStream.next(event);
    }

    /** 
     * 仅作清空多选选项
     */
    clearSelect($event?: MouseEvent): void {
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
       this.value = [];
        
    }

    // 写入值
    writeValue(value: any) {
        if (value !== this._value) {
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
    queryData(options?: Array<Meta>) {
        if (!this.canQuery) return;
        let queryParams = {
            "type": this.metaType
        };
        let page = {
            first: 0,
            rows: 9999
        }
        this.api.call("CommonController.findMeta",page, queryParams).ok(json => {
            const result = json.result || [];
            this.options = [];
            this.options = result.content;
            if (!this.options.length) {
                const lastItem = new Array<Meta>({ id: "empty", label: "没有更多选项！", disabled: true });
                this.options = options.concat(lastItem);
                this.canQuery = false;
                return;
            }
            this.outOptions.emit(this.options);
        }).fail(err => {
            if (!this.options.length) {
                const lastItem = new Array<Meta>({ id: "empty", label: "没有更多选项！", disabled: true });
                this.options = options.concat(lastItem);
                this.canQuery = false;
                return;
            }
            throw new Error(err);
        });
    }

}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
    ],
    declarations: [
        MetaSelectComponent
    ],
    exports: [MetaSelectComponent]
})
export class MetaSelectModule { }
