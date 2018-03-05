import { Component, forwardRef, Input, Output, EventEmitter, NgModule } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from "@angular/forms";
import { AbnormalTypeService } from "../services/abnormal-type.service";
import { CommonModule } from "@angular/common";
import { UISelectBoxModule } from "../select-box/select-box.component";


let noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AbnormalSelectComponent),
    multi: true
};

@Component({
    selector: "yzt-abnormal",
    template: `
    <ui-select-box 
        [(ngModel)]="value"
        [label]="label" 
        [placeholder]="placeholder" 
        (onChange)="onValueChange($event)"
        [label-handler]="labelHandler"
        [data-handler]="dataHandler"></ui-select-box>
    `,
    styles: [`
    
    `],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class AbnormalSelectComponent implements ControlValueAccessor {
  
    @Input()
    placeholder = '请选择…';

    /**
     * 显示值的标签
     */
    @Input()
    label = '';

    @Output()
    onChange: EventEmitter<any> = new EventEmitter<any>();

    public onTouchedCallback: () => void = noop;
    public onChangeCallback: (_: any) => void = noop;
    public innerValue;

    dataHandler: Function = this.abnormalTypeService.selectBoxHandler();
    labelHandler: Function = this.abnormalTypeService.selectBoxLabelHandler();
    // 获取属性
    get value(): any {
        return this.innerValue;
    };

    // 设置属性，并触发监听器
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    constructor(public abnormalTypeService: AbnormalTypeService) {
    }

    // 写入值
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
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
     * 值改变事件
     * @param val
     */
    onValueChange(val) {
        this.onChange.emit(val);
    }

}

@NgModule({
    declarations: [
        AbnormalSelectComponent,
    ],
    exports: [AbnormalSelectComponent],
    imports: [
        CommonModule,
        FormsModule,
        UISelectBoxModule
    ],
    providers:[
        AbnormalTypeService
    ]
})
export class AbnormalSelectModule { }
