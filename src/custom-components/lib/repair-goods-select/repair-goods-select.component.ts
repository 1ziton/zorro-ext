import {
    Component,
    OnInit,
    Input,
    forwardRef,
    NgModule,
    TemplateRef,
    Output,
    EventEmitter,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from '../../../../index.showcase';
import { API } from '../services/api';
import { Subject } from 'rxjs/Rx';

export interface GoodOpt {
    name: string;
    goodId?: string;
    disabled?: boolean;
}

export interface DomOpt {
    _value: string;
    _label: string;
}

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RepairGoodSelectComponent),
    multi: true
};
@Component({
    selector: `yzt-repair-goods`,
    template: `
    <div class="repair-goods-select">
        <nz-select 
            class="good-nz-select"
            [style.width]="_width" 
            [nzPlaceHolder]="placeholder" 
            [nzMode]="_nzMode"
            [nzFilter]="_filter"
            [nzAllowClear]="_allowClear"
            (nzSearchChange)="yztSearchChange($event)"
            [(ngModel)]="value">
            <nz-option
                #domOpt
                *ngFor="let option of options"
                [nzLabel]="option.name"
                [nzValue]="option.goodId"
                [nzDisabled]="option.disabled">
                <ng-template *ngIf="_content" #nzOptionTemplate>
                    <ng-container [ngTemplateOutlet]="_content" [ngTemplateOutletContext]="option"></ng-container>
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
        .repair-goods-select {
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
        .good-nz-select:hover +.close-icon {
            opacity: 1;
        }
    `],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class RepairGoodSelectComponent implements ControlValueAccessor, OnInit {
    @ViewChild("domOpt") domOpt: DomOpt;
    private onTouchedCallback: () => () => {};
    private onChangeCallback: (_: any) => () => {};

    options: Array<GoodOpt> = [];
    // 单选的时候传字符串，多选传数组
    _value: string;
    _width = "100%";
    _content: TemplateRef<any>;
    _allowClear = true;
    _nzMode = "combobox";
    // 下拉过滤含关键字选项，false为不过滤
    _filter = false;
    currentText = '';
    canQuery = true;
    keyWordStream = new Subject<string>()
    keyWord$: any;

    @Input() placeholder = "请选择维修品名";
    @Input() valueType = "";

    set value(v: any) {
        if(typeof v === 'string' && v.trim() === '' || !v) 
            this.options = [];
        this._value = v;
        // 双向绑定获取对象
        if (this.valueType === "object") {
            const { _value, _label } = this.domOpt;
            this.onChangeCallback({ value: _value, label: _label });
        } else {
            const innerValue = this._allowClear ? (v || "") : (v || []);
            this.onChangeCallback(innerValue);
        }

    }

    get value(): any {
        return this._value;
    };

    @Input() set width(v: any) {
        const width = parseInt(v);
        this._width = Array.from(v).includes("%") ? `${v}%` : isNaN(width) ? this._width : `${width}px`;
    }

    @Input() set goodMode(v) {
        this._nzMode = v;
        this._allowClear = v === "combobox" ? true : false;
    };

    @Input() set customTemplate(tpl: TemplateRef<any>) {
        if (tpl instanceof TemplateRef) {
            this._content = tpl;
        }
    }

    constructor(private api: API) {
    }

    ngOnInit() {
        // 限流
        this.keyWord$ = this.keyWordStream
            .debounceTime(250)
            .subscribe(word => {
                this.queryData(word, [])
            });

    }

    ngOnDestroy() {
        this.keyWord$.unsubscribe()
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

    yztSearchChange(event: string) {
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
        this.options = [];
        this.value = '';
    }

    /**
     * 查询数据
     * @param $event
     */
    queryData(searchText?: string, options?: Array<GoodOpt>) {
        if (!this.canQuery) return;
        const waybillId = searchText;
        this.options = [];
        this.api.call("AbnormalRegistController.waybillQuery", {
            waybillId: waybillId
        }).ok(json => {
            const repairGoods = json.result && json.result.waybillGoodsInfo || [];
            repairGoods.forEach((repairGood) => {
                repairGood.name = repairGood["goodsName"];
                repairGood.goodId = repairGood["wayBillGoodsId"];
            });
            this.options = repairGoods;
        }).fail(err => {
            if (!this.options.length) {
                const lastItem = new Array<GoodOpt>({ goodId: "empty", name: "没有更多选项！", disabled: true });
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
        RepairGoodSelectComponent
    ],
    exports: [RepairGoodSelectComponent]
})
export class RepairGoodSelectModule { }
