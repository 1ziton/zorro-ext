/*tslint:disable*/
import {
    Component,
    forwardRef,
    OnInit,
    Input,
    AfterViewInit,
    Renderer,
    OnDestroy,
    Output,
    EventEmitter,
    NgModule
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NzInputModule } from "../../../components/ng-zorro-antd.module";

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UISelectBox),
    multi: true
};
// 
@Component({
    selector: 'ui-select-box',
    template: `
    <div class="ui-select-div" (mouseleave)="onMouseout($event)">
        <input class="ant-input" [placeholder]="placeholder"
            [ngStyle]="{'width': width,'height':height,'border':border,'placeholder':placeholder}"  type="text"
            (mouseover)="onMouseover($event)"  [(ngModel)]="label" readonly (click)="inputClick($event)"
            (focus)="onInputFocus($event)" (blur)="onInputBlur($event)"/>
        <span
            role="close-icon"
            (click)="clear()"
            class="ant-select-selection__clear close-icon"
            style="-webkit-user-select: none;"
            *ngIf="label && overFlag">
        </span>
        <div class="select-box" [ngClass]="{hide:showBox!=true}" (blur)="blur()" (click)="panelClick($event)">
            <ul class="header">
                <li *ngFor="let selectBox of selectBoxs;let i = index" [ngClass]="{active:i==activeIndex}"
                    (click)="activeIndex=i">
                    {{selectBox.title}}
                </li>
            </ul>
            <button class="close" (click)="showBox=false">&times;</button>
            <ul class="body" *ngFor="let selectBox of selectBoxs;let i = index" [ngClass]="{hide:i!=activeIndex}"
                (mouseenter)="onMouseEnterHandler($event)">
                <li *ngFor="let select of selectBox.data">
                    <a href="javascript:void(0)" (click)="choose(select,i)" [ngClass]="{'selected':select.checked}">{{select.label}}</a>
                </li>
            </ul>
        </div>
    </div>`,
    styles: [`
        .ant-input{
            position: relative;
            display: inline-block;
            padding: 4px 7px;
            width: 100%;
            height: 28px;
            font-size: 12px;
            line-height: 1.5;
            color: rgba(0, 0, 0, 0.65);
            background-color: #fff;
            background-image: none;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            -webkit-transition: all .3s;
            transition: all .3s;
        }
        .ui-select-div{
            position: relative;
            display: inline;
            
        }
        .close-icon {
            opacity: 0;
            position: absolute;
            right: 5px;
            top: 50%;
        }
        .close-icon:hover {
            opacity: 1;
        }
        .ant-input:hover +.close-icon {
            opacity: 1;
        }
        .select-box{
            position: absolute;
            width: 395px;
            box-shadow: 2px 4px 12px rgb(123, 123, 123);
            z-index: 19999;
            background-color: #ffffff;
        }

        .hide {
            display: none;
        }

        ul.header {
            margin: 0;
            list-style: none;
            background-color: #108ee9;
            height: 32px;
            padding: 6px 6px 0px;
            box-sizing: border-box;
            position: relative;
        }
        ul.header>li {
            padding: 0 8px 0 8px;
            margin-right: 12px;
            height: 26px;
            float: left;
            font-size: 12px;
            text-align: center;
            color: #fff;
            line-height: 24px;
            cursor: pointer;
        }
        ul.header>li.active {
            color: #108ee9;
            background-color: #fff;
        }

        ul.body>li {
            font-size: 12px;
            color: #333;
            margin-top: 5px;
            float: left;
            text-align: left;
            width: 120px;
            margin-right: 11px;
        }

        ul.body>li>a {
            text-decoration: none;
            color: #333;
            display: inline-block;
            padding: 4px 12px;
            position: relative;
        }

        ul.body>li>a.active,ul.body>li>a:hover{
            background: #108ee9;
            color: #fff;
        }

        button.close {
            position: absolute;
            background-color: transparent;
            border: none;
            color: #ffffff;
            top: 3px;
            right: 5px;
            font-size: 20px;
        }
      
        @media screen and (max-width: 1024px) {
            input.select-input {
                width: 48px;
            }
        }

        .selected{
            background-color: #0d82de;
            color: #ffffff !important;
        }

    `],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class UISelectBox implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

    /** * 用于注册数据处理回调函数
     */
    @Input("data-handler")
    dataHandler: Function;
    /** * 用于注册数据处理回调函数
     */
    @Input("label-handler")
    labelHandler: Function;
    /**
     * 显示值的标签
     */
    @Input()
    label: any;

    @Input()
    level: any; //可控制选择的级别

    @Input()
    border;

    @Input()
    multiSelect: boolean = false;

    @Input()
    placeholder = '';

    @Input()
    width: any;

    @Input()
    height: any;

    @Output()
    onChange: EventEmitter<any> = new EventEmitter<any>();

    /**
     * 控制选择框是否显示
     */
    showBox: boolean;
    /**
     * 选择框Tab数组
     */
    selectBoxs: any[] = [];
    /**
     * 当前激活的Tab
     */
    activeIndex: number;


    focus: boolean = false;
    overFlag: boolean = false;

    dropdownFocus: boolean = false;

    documentClickListener: any;

    firstTimeInit: boolean = false;

    cacheLabels: any[] = [];

    public onTouchedCallback: () => void = noop;
    public onChangeCallback: (_: any) => void = noop;
    public innerValue;

    constructor(public renderer: Renderer) {
    }

    ngOnInit(): void {
        this.firstTimeInit = true;
        this.showBox = false;
        this.selectBoxs = [];
        this.activeIndex = 0;
        this.dataHandler(this.selectBoxs, undefined, this.level >= 3 ? this.level : 3);
    }

    ngAfterViewInit() {
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            this.hide();
        });
    }

    /**
     * 隐藏弹窗
     */
    hide() {
        this.showBox = false;
    }

    onInputFocus(event) {
        this.focus = true;
        event.stopPropagation();
        this.show()
    }

    onInputBlur(event) {
        this.focus = false;
        this.onTouchedCallback();
    }

    onMouseEnterHandler(event) {
        ////console.log('enter')
        this.dropdownFocus = true;
    }

    /**
     * 输入框点击事件
     * @param event
     */
    inputClick(event) {
        event.stopPropagation();
    }

    /**
     * 面板点击事件处理
     * @param event
     */
    panelClick(event) {
        event.stopPropagation();
    }

    /**
     * 触发选择框弹出
     * @param event
     */
    toggle(event: Event): any {
        this.showBox = true;
    }

    show() {
        if (!this.showBox && (this.focus || this.dropdownFocus)) {
            this.showBox = true;
        }
    }

    /**
     * 选择某个选项时
     * @param select
     * @param i
     */
    choose(select: any, i: number): any {

        if (!this.multiSelect) {

            this.selectBoxs[i].select = select;
            this.value = select.value;
            if (select.end || (this.level == select.level && select.level !== undefined)) {
                this.activeIndex = i;
                this.showBox = false;
            } else {
                this.activeIndex = i + 1;
                this.selectBoxs = this.selectBoxs.slice(0, i + 1);
                let this_ = this;
                setTimeout(() => {
                    this_.dataHandler(this_.selectBoxs, select, this.level >= 3 ? this.level : 3);
                }, 10);
            }
            this.label = "";
            let index = 0;
            for (let selectBox of this.selectBoxs) {
                index++;
                if (selectBox.select) {
                    if (this.label.length != 0) {
                        this.label += "/";
                    }
                    this.label += selectBox.select.label;
                    if (index == this.selectBoxs.length) {
                        this.onChange.emit({
                            value: this.value,
                            level: selectBox.select.level,
                            id: selectBox.select.id,
                            label: this.label
                        })
                    }
                }
            }

        } else {
            //多选
            select.checked = !select.checked;
            if (select.checked) {
                if (!this.value) {
                    this.value = [];
                }
                this.value.push(select.value);
                this.cacheLabels.push(select.label);
                this.label = this.cacheLabels.join('、');

            } else {
                _.remove(this.value, n => {
                    return select.value === n;
                });
                _.remove(this.cacheLabels, n => {
                    return select.label === n;
                });
                this.label = this.cacheLabels.join('、');
            }
        }

    }


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

    // 设置某些事件确认值变化
    blur() {
        this.onTouchedCallback();
    }

    // 写入值
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            if (this.labelHandler && this.innerValue && this.firstTimeInit) {
                this.labelHandler(this, this.innerValue);
                this.firstTimeInit = false;
            }
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

    // 清除已选内容
    clear() {
        this.label = '';
        this.value = '';
        this.innerValue = '';
        this.activeIndex = 0;
        if (this.multiSelect) {
            this.unCheckedAll();
            this.cacheLabels = [];
        }
    }
    // 多选的时候清除选中效果
    unCheckedAll() {
        if (this.selectBoxs[0] && this.selectBoxs[0]['data']) {
            for (let d of this.selectBoxs[0]['data']) {
                d.checked = false;
            }
        }

    }

    onMouseover($event) {
        this.overFlag = true;
        $event.stopPropagation();
    }

    onMouseout($event) {
        this.overFlag = false;
        $event.stopPropagation();
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }

}

@NgModule({
    declarations: [
        UISelectBox
    ],
    exports: [UISelectBox],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class UISelectBoxModule { }
