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
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Subject } from 'rxjs/Rx';
import { ApiService } from '../services/api.service';

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
  useExisting: forwardRef(() => StandardGoodComponent),
  multi: true
};

@Component({
  selector: `standard-good`,
  template: `
  <div class="good-select">
      <nz-select
          class="good-nz-select"
          [nzServerSearch]="true"
          nzShowSearch
          [style.width]="_width"
          [nzDropdownStyle]="_dropdownStyle"
          [nzPlaceHolder]="_placeholder"
          [nzMode]="_nzMode"
          [nzAllowClear]="_allowClear"
          (nzScrollToBottom)="yztScrollToBottom()"
          (nzOnSearch)="yztSearchChange($event)"
          (nzOpenChange)="yztOpenChange($event)"
          [nzDisabled]="nzDisabled"
          [(ngModel)]="value">

          <ng-template [ngIf]="!_content">
              <ng-container *ngFor="let option of options; let i = index;">
                  <nz-option
                      *ngIf="!loading"
                      [nzLabel]="option.name"
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
      <span class="echo-loading" *ngIf="loading"><i class="anticon anticon-loading anticon-spin loading-pos"></i></span>
  </div>
  `,
  styles: [`
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
      .good-select {
          position: relative;
      }
      .echo-loading {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          min-height: 28px;
      }
      .loading-pos {
          position: absolute;
          left: 10px;
          top: 6px;
      }
  `],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class StandardGoodComponent implements ControlValueAccessor, OnInit {
  @ViewChild("domOpt") domOpt: DomOpt;
  private onTouchedCallback: () => () => {};
  private onChangeCallback: (_: any) => () => {};

  options: Array<GoodOpt> = [];
  // 单选的时候传字符串，多选传数组
  _value: string;
  _width = "100%";
  _content: TemplateRef<any>;
  _allowClear = true;
  _nzMode = "default";
  // 下拉过滤含关键字选项，false为不过滤
  _filter = false;
  _placeholder = ""
  currentText = "";
  firstNum = 1;
  canQuery = true;
  loading = false;
  keyWordStream = new Subject<string>()
  keyWord$: any;
  _dropdownStyle: { width: '100%' };

  @Input() goodId = "";
  @Input() placeholder = "请选择品名";
  @Input() rowsNum = 10;
  @Input() valueType = "";
  @Input() nzDisabled = false;
  @Input() set dropdownStyle(value) {
    this._dropdownStyle = { width: value };
  }

  set value(v: any) {
    if (!v) {
      this.canQuery = true;
      this.firstNum = 1;
      // this.queryData('', []);
      this.onChangeCallback({});
      return;
    }
    // 防止重复赋值
    if (_.isEqual(this._value, v)) return;
    this._value = v;
    // 双向绑定获取对象
    if (this.valueType === "object") {
      this.onChangeCallback(v);
    } else if (this.valueType === "objectString") {
      this.onChangeCallback(`{standProductName: ${v.name}, standProductId: ${v.code}}`)
    } else {
      const innerValue = this._allowClear ? (v.code || "") : (<Array<any>>v.map(val => val.code) || []);
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
    this._allowClear = v === "default" ? true : false;
  };

  @Input() set customTemplate(tpl: TemplateRef<any>) {
    if (tpl instanceof TemplateRef) {
      this._content = tpl;
    }
  }

  @Output() onChange = new EventEmitter();
  @Output() nzOpenChange: EventEmitter<any> = new EventEmitter();

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    // 限流
    this.keyWord$ = this.keyWordStream
      .debounceTime(250)
      .subscribe(word => {
        this.queryData(word, []);
      });
    this._placeholder = this.placeholder;
  }

  ngOnChanges(changes: any) {
    if (changes.goodId && this.goodId) {
      this.firstNum = 1;
      this.loading = true;
      this.queryData(this.goodId, [], true);
    }
    if (changes.customerId) {
      this.firstNum = 1;
      this.loading = true;
      this.canQuery = true;
      this.queryData(this.goodId, []);
    }
  }

  ngOnDestroy() {
    this.keyWord$.unsubscribe()
  }

  // 写入值
  writeValue(value: any) {
    if (value !== this._value) {
      if (typeof this._value === 'object') {
        this.currentText = value.name;
        this.firstNum = 1;
        this.loading = true;
        this._placeholder = '';
        if (value.name) {
          this.queryData(value.name, [], true);
        } else {
          this.queryData(value, [], true);
        }
      } else {
        this._value = value;
      }
    } else {
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

  yztSearchChange(inputValue) {
    if (!inputValue) return;
    this.canQuery = true;
    this.currentText = inputValue;
    this.firstNum = 1;
    this.keyWordStream.next(inputValue);
  }

  yztScrollToBottom() {
    this.queryData(this.currentText, this.options);
  }

  yztOpenChange(nzOpen: boolean) {
    if (nzOpen) {
      // 当前ngModel有值时，下拉选择无内容时对当前值搜索一次
      if (!this.options.length || (this.options.length === 1 && this.options[0]['disabled'])) {
        this.canQuery = true;
        let keyword = this.value ? this.value.name : '';
        this.queryData(keyword, []);
      }
    }
    this.nzOpenChange.emit(nzOpen);
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
  queryData(searchText?: string, options?: Array<GoodOpt>, firstIn: boolean = false) {
    if (!this.canQuery) return;
    const goodName = searchText;
    let params;
    if (this.goodId) {
      params = [{ "page": this.firstNum, "size": this.rowsNum }, { code: this.goodId }];
    } else {
      params = [{ "page": this.firstNum, "size": this.rowsNum }, { name: goodName }];
    }
    this.api.getStandarGood(params).subscribe(json => {
      let content = json && json['content'] || {};
      let result = content['content'] || []

      this.options = options.concat(result);
      this.firstNum += 1;
      if (firstIn || this.goodId) {
        this.value = this.options[0];
      }
      this.loading = false;
      this._placeholder = this.placeholder;

      if (!result.length) {
        this.options.push({ goodId: "empty", name: "没有更多选项！", disabled: true });
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
    StandardGoodComponent
  ],
  exports: [StandardGoodComponent]
})
export class StandardGoodModule { }
