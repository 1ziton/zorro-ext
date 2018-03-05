import { Component, OnInit, NgModule, ViewChild, TemplateRef, Input, Output, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UISelectBoxModule } from '../select-box/select-box.component';
import { Subject } from 'rxjs';
import { API } from '../services/api';
import { NgZorroAntdModule } from '../../../components/ng-zorro-antd.module';

export interface Department {
    compayId: string;
    compayName: string; 
    departments?:any;
    disabled?: boolean;
}
export interface DomOpt {
    code: string;
    fullName:string;
    id: string;
    name: string;
    remark: string;
}

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DepartmentSelectComponent),
    multi: true
};
@Component({
  selector: 'yzt-department',
  template: `
    <div class="department-select">
    <nz-select 
        class="department-nz-select"
        [style.width]="_width" 
        [nzPlaceHolder]="placeholder"
        [nzMode]="_nzMode"
        [nzFilter]="_filter"
        [nzAllowClear]="_allowClear"
        (nzSearchChange)="yztSearchChange($event)"
        [(ngModel)]="value">
        <nz-option #domOpt *ngFor="let option of options;let i=$index" [nzLabel]="option.compayName" [nzDisabled]='true' nzValue='_parent_{{i}}'>
            <ng-template *ngIf="_contentCompany" #nzOptionTemplate>
                <ng-container [ngTemplateOutlet]="_contentCompany" [ngTemplateOutletContext]="option"></ng-container>
            </ng-template>
            <nz-option *ngFor="let obj of option.departments" [nzLabel]="obj.name" [nzValue]="obj">
                <ng-template *ngIf="_contentDepartment" #nzOptionTemplate>
                    <ng-container [ngTemplateOutlet]="_contentDepartment" [ngTemplateOutletContext]="obj"></ng-container>
                </ng-template>
            </nz-option>
        </nz-option>
    </nz-select>
    </div>`,
  styles: [`
    .department-select{
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
    .department-nz-select:hover +.close-icon {
        opacity: 1;
    }
  `],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DepartmentSelectComponent implements ControlValueAccessor,OnInit {
    @ViewChild("domOpt") domOpt: DomOpt;
    private onTouchedCallback: () => () => {};
    private onChangeCallback: (_: any) => () => {};

    options: Array<Department> = [];
    // 单选的时候传字符串，多选传数组
    _value: string;
    _width = "100%";
    _allowClear = true;
    _nzMode = "combobox";
    // 下拉过滤含关键字选项，false为不过滤
    _filter = false;
    currentText = '';
    canQuery = true;
    keyWordStream = new Subject<string>()
    keyWord$: any;
    _contentCompany: TemplateRef<any>;
    _contentDepartment: TemplateRef<any>;

    @Input() placeholder = "请输入网点";
    // 需要获取的值类型
    @Input() valueType = "object";

    // 设置属性，并触发监听器
    set value(v: any) {
        if (typeof v === 'string' && v.trim() === '' || !v)
            this.queryData('', []);
        this._value = v;
        // 双向绑定获取对象
        if (this.valueType === "object") {
            this.onChangeCallback(v);
        } else {
            let compayName = v.name || v;
            let compayId = v.id || v;
            this.valueType === "id" ? this.onChangeCallback(compayId) : this.onChangeCallback(compayName);
        }
    }

    get value(): any {
        return this._value;
    };

    @Input() set width(v: any) {
        const width = parseInt(v);
        this._width = Array.from(v).includes("%") ? `${v}%` : isNaN(width) ? this._width : `${width}px`;
    }

    @Input() set customCompanyTemplate(tpl: TemplateRef<any>) {
        if (tpl instanceof TemplateRef) {
            this._contentCompany = tpl;
        }
    }

    @Input() set customDepartmentTemplate(tpl: TemplateRef<any>) {
        if (tpl instanceof TemplateRef) {
            this._contentDepartment = tpl;
        }
    }

    @Output() openChange: EventEmitter<any> = new EventEmitter();
    @Output() outOptions: EventEmitter<any> = new EventEmitter();

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

    yztSearchChange(event) {
        this.canQuery = true;
        this.currentText = event;
        this.keyWordStream.next(event);
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
    queryData(searchText?: string, options?: Array<Department>) {
        if (!this.canQuery) return;
        let qryParams = {
            name: searchText
        };
        let page = {
            first: 0,
            rows: 9999
        };
        
        this.api.call("CommonController.findCompanyDepartment",page, qryParams).ok(json => {
            const result = json.result || [];
            const dataList = result.content || [];
            this.options = [];
            for (let company of dataList) {

                if (!company.compayName) {
                    continue;
                }

                let obj = {
                    "compayId": company.compayId,
                    "compayName": company.compayName,
                    "departments": company.departments
                };
                this.options.push(obj);
            }
            this.outOptions.emit(this.options);
            if (!this.options.length) {
                const lastItem = new Array<Department>({ compayId: "empty", compayName: "没有更多选项！", disabled: true });
                this.options = options.concat(lastItem);
                this.canQuery = false;
                return;
            }
        }).fail(err => {
            if (!this.options.length) {
                const lastItem = new Array<Department>({ compayId: "empty", compayName: "没有更多选项！", disabled: true });
                this.options = options.concat(lastItem);
                this.canQuery = false;
                return;
            }
            throw new Error(err);
        });
    }

}
@NgModule({
    declarations: [
        DepartmentSelectComponent
    ],
    exports: [DepartmentSelectComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule
    ]
})
export class DepartmentSelectModule { }