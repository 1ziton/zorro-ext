import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild, EventEmitter, forwardRef,
  Input,
  NgModule,
  OnInit, Output,
  Renderer2,
  TemplateRef
} from '@angular/core';

import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import 'rxjs';
import { API } from '../services/api';
import {NgZorroAntdModule} from '../../../../index.showcase';
import {tagAnimation} from '../../../components/core/animation/tag-animations';
import {dropDownAnimation} from '../../../components/core/animation/dropdown-animations';


export const EXE_COUNTER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CitySelectComponent),
  multi: true
};

@Component({
  selector: 'yzt-area-multiple',
  templateUrl: './city-select.component.html',
  animations: [
    dropDownAnimation,
    tagAnimation
  ],
  styleUrls: ['./city-select.component.less'],
  providers: [EXE_COUNTER_VALUE_ACCESSOR]
})
export class CitySelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  result: any[] = [];
  _label: string = '';
  _width = '190px';

  /**
   * 控制选择框是否显示
   */
  showBox: boolean;
  documentClickListener: any;
  //省市区数据
  provinceData: any[] = [];
  cityData: any[] = [];
  districtData: any[] = [];

  checkedProArr: any[] = [];
  checkedCityArr: any = [];
  checkedDistrictArr: any = [];
  totalTree: any[] = [];

  private _value: string;
  private onChangeCallback: (_: any) => void = () => {
  };
  private onTouchedCallback: () => void = () => {
  };

  @Output()
  onChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  maxNum: number | null = 3;
  @Input()
  placeholder: string = '请选择地区';

  @Input() set width(v) {
    const width = parseInt(v);
    this._width = Array.from(v).includes('%') ? `${v}%` : isNaN(width) ? this._width : `${width}px`;
  }

  @ContentChild('render') render: TemplateRef<void>;

  constructor(public api: API, public rd: Renderer2, public cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.showBox = false;
    this.getData('provinceData', { 'code': '000000000000' });
  }

  // 写入值
  writeValue(value: any) {
    if (value !== this._value) {
      console.log(value);
      this._value = value;
    }
  }

  set value(value: string) {
    if (value !== this._value) {
      this._value = value;
      this.onChangeCallback(value);
    }
  }

  get value(): string {
    return this._value;
  };

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  /**
   * 隐藏弹窗
   */
  hide() {
    this.showBox = false;
  }

  selectPro(pro, label, $event) {
    $event.stopPropagation();
    if (!pro || !label.checked || $event.target.tagName === 'I') return;
    this.clearClick('provinceData');
    pro.click = true;
    this.districtData = [];
    this.getData('cityData', pro);
  }

  ngAfterViewInit() {
    this.documentClickListener = this.rd.listen('body', 'click', () => {
      this.hide();
    });
  }

  /**
   * 输入框点击事件
   * @param event
   */
  inputClick(event) {
    this.showBox = true;
    event.stopPropagation();
  }

  checkedPro(pro, label, $event) {
    $event.stopPropagation();
    if (label.checked) {
      if (!this.ismaxNum(pro)) {
        $event.preventDefault();
        return;
      }
      this.clearClick('provinceData');
      pro.click = true;
      pro.children.length ? pro.children = [] : null;
      this.checkedProArr.push(pro.code);
      this.totalTree.push(pro);
      this.districtData = [];
      this.getData('cityData', pro);
    } else {
      // 清除 cheked
      this.totalTree.forEach((p) => {
        if (p.code === pro.code) {
          if (p.children.length) {
            p.children.forEach((c) => {
              if (c.children.length) {
                c.children.forEach((d) => {
                  if (this.checkedDistrictArr.includes(d.code)) {
                    this.checkedDistrictArr.splice(this.checkedDistrictArr.indexOf(d.code), 1);
                  }
                });
              }
              this.checkedCityArr.includes(c.code) ?
                this.checkedCityArr.splice(this.checkedCityArr.indexOf(c.code), 1) : null;
            });
          }
        }
      });
      this.checkedProArr.splice(this.checkedProArr.indexOf(pro.code), 1);
      this.deleteSelect(this.totalTree, pro);
      if (pro.click) {
        this.cityData = [];
        this.districtData = [];
      }
      pro.click = false;
    }
    this.handleResult();
  }

  selectCity(city, label, $event) {
    $event.stopPropagation();
    //点击文字如果没选中直接return
    if (!city || !label.checked || $event.target.tagName === 'I') return;
    this.clearClick('cityData');
    city.click = true;
    this.getData('districtData', city);
  }

  checkedCity(city, label, $event) {
    $event.stopPropagation();
    //选中
    if (label.checked) {
      if (!this.ismaxNum(city)) {
        $event.preventDefault();
        return;
      }
      this.clearClick('cityData');
      city.click = true;
      //如果有区 就情空
      city.children.length ? city.children = [] : null;
      this.checkedCityArr.push(city.code);
      //遍历省 添加市
      this.totalTree.forEach((p) => {
        if (p.code === city.parentCode) {
          p.children.push(city);
        }
      });
      this.getData('districtData', city);
      //取消选中
    } else {

      //清除选择记录
      this.checkedCityArr = this.checkedCityArr.filter(v => v !== city.code);
      //清除市
      this.totalTree.forEach((p, i) => {
        if (p.code === city.parentCode) {
          if (p.children.length) {
            p.children.forEach((c, i) => {
              //遍历删除区checked
              if (c.code === city.code) {
                c.children.forEach((d) => {
                  if (this.checkedDistrictArr.includes(d.code)) {
                    this.checkedDistrictArr.splice(this.checkedDistrictArr.indexOf(d.code), 1);
                  }
                });
                //删除市数据
                p.children.splice(i, 1);
                if (!p.children.length) {
                  this.cityData = [];
                }
              }
            });
          }
        }
      });
      if (city.click) {
        this.districtData = [];
      }
      city.click = false;
    }
    this.handleResult();

  }

  selectDistrict(district, label, $event) {
    $event.stopPropagation();
    //点击文字如果没选中直接return
    if (!district || !label.checked) return;
    this.clearClick('districtData');
    district.click = true;
  }

  /**
   * 点击区多选框
   */
  checkedDistrict(district, label, $event) {
    $event.stopPropagation();
    //选中
    if (label.checked) {
      if (!this.ismaxNum(district)) {
        $event.preventDefault();
        return;
      }
      this.clearClick('districtData');
      district.click = true;
      this.checkedDistrictArr.push(district.code);
      this.totalTree.forEach((v) => {
        v.children.forEach((v) => {
          v.code === district.parentCode ? v.children.push(district) : null;
        });
      });
    } else {
      district.click = false;
      this.checkedDistrictArr = this.checkedDistrictArr.filter(v => v !== district.code);
      this.totalTree.forEach((p) => {
        if (p.children.length) {
          p.children.forEach((c) => {
            if (c.code === district.parentCode) {
              c.children = c.children.filter((d) => d.code !== district.code);
              if (!c.children.length && c.click) {
                this.districtData = [];
              }
            }
          });
        }
      });
    }
    this.handleResult();
  }

  clearClick(type) {
    this[type].forEach(v => {
      v.click = false;
    });
  }

  /**
   * 获取省市区的数据
   */
  getData(type, pro) {
    let cacheArea = this.getCache(pro.code);
    if (cacheArea.length) {
      cacheArea.forEach((v) => {
        v.children = [];
      });
      this.setChecked(type, cacheArea);
      this.setParent(cacheArea, type === 'province' ? { code: -1 } : pro);
      this[type] = cacheArea
      return;
    }
    this.api.call('CommonController.findAreasByParent', { code: pro.code }).ok(json => {
      let result = json && json.result || [];
      this.setCache(pro.code, result);
      result.forEach((v) => {
        v.children = [];
      });
      this.setChecked(type, result);
      this.setParent(result, type === 'province' ? { code: -1 } : pro);
      this[type] = result
    });
  }

  panelClick($event) {
    $event.stopPropagation();
  }

  deleteChoice(obj, $event) {
    $event.stopPropagation();
    this.totalTree.forEach((p, i) => {
      if (this.checkedProArr.includes(p.code)) {
        //如果删除省
        if (obj.code === p.code) {
          p.click = false;
          //清除省市区checked
          this.checkedProArr.splice(this.checkedProArr.indexOf(p.code), 1);
          //清除数据
          this.totalTree.splice(i, 1);
          this.result.forEach((v, i) => {
            if (v.code === obj.code) {
              this.result.splice(i, 1);
            }
          });
          this.districtData = [];
          this.cityData = [];
          return;

        }
        //删除市
        if (p.children.length) {
          let citys = p.children;
          citys.forEach((c, i) => {
            if (this.checkedCityArr.includes(c.code)) {
              if (obj.code === c.code) {
                c.click = false;
                citys.splice(i, 1);
                //清除省 checked数据
                if (!citys.length) {
                  this.cityData = [];
                }
                if (citys.click) {
                  this.districtData = [];
                }
                //清除 市checked 数据
                this.checkedCityArr.splice(this.checkedCityArr.indexOf(c.code), 1);

                return;
              }
              if (c.children.length) {
                let districts = c.children;
                districts.forEach((d, i) => {
                  if (this.checkedDistrictArr.includes(d.code)) {
                    if (obj.code === d.code) {
                      d.click = false;
                      districts.splice(i, 1);
                      //如果只有一个区 删除上级市
                      if (!districts.length && c.click) {
                        this.districtData = [];
                      }
                      this.checkedDistrictArr.splice(this.checkedDistrictArr.indexOf(d.code), 1);
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
    this.handleResult();
  }

  setChecked(type, data) {
    let arr: any[] = [];
    type === 'city' ? arr = this.checkedCityArr : type === 'district' ? arr = this.checkedDistrictArr : this.checkedProArr;
    data.forEach((v) => {
      if (arr.indexOf(v.code) !== -1) {
        v.checked = true;
      }
    });
  }

  /**
   * 给省市区数据打上标记
   * @param {any[]} data
   * @param obj
   */
  setParent(data = [], obj) {
    data.forEach(item => {
      item.parentCode = obj.code;
      item.parentName = obj.name;
    });
  }

  /**
   * 删除选中的数据 & 移除子区域
   * @param {Array} data 当前区域
   * @param obj 当前选中
   */
  deleteSelect(data = [], obj) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].code === obj.code) {
        data.splice(i, 1);
      }
    }
  }

  clear() {
    this._label = '';
    this.totalTree.forEach(p => {
      p.click = false;
    });
    this.cityData = [];
    this.districtData = [];
    this.checkedProArr = [];
    this.checkedCityArr = [];
    this.checkedDistrictArr = [];
    this.result = [];
    this.totalTree = [];
    this.handleResult();
  }

  /**
   * 处理totaltree
   */
  handleResult(type?) {
    this.result = [];
    this._label = '';
    for (let t of this.totalTree) {
      let name = t.name;
      let obj = {
        name: name,
        code: t.code
      };
      let children = t.children;
      if (children.length) {
        for (let c of children) {
          let children2 = c.children;
          let cityObj = {
            name: name + '/' + c.name,
            code: c.code
          };
          // 选中了district
          if (children2.length) {
            for (let d of children2) {
              let districtObj = {
                name: cityObj['name'] + '/' + d.name,
                code: d.code
              };
              this.result.push(districtObj);
            }
          } else {
            this.result.push(cityObj);
          }
        }
      } else {
        this.result.push(obj);
      }
    }
    let labels = [], code = [];
    this.result.forEach(v => {
      labels.push(v.name);
      code.push(v.code);
    });
    this._label = labels.join(',');
    this.onChangeCallback(code);
    this.onChange.emit(this.result);
  }

  /**
   * input checked
   */
  itemsIsChecked(type, item) {
    switch (type) {
      case 'province':
        return this.checkedProArr.includes(item.code);
      case 'city':
        return this.checkedCityArr.includes(item.code);
      case 'district':
        return this.checkedDistrictArr.includes(item.code);
    }
  }

  /**
   * 限制选择数量
   * @param obj
   * @returns {boolean}
   */
  ismaxNum(obj) {
    if (!this.maxNum) {
      return true;
    }
    let values: any = [];
    this.result.forEach(v => {
      values.push(v.code);
    });
    values = values.join(',');
    let len = this.result.length;
    if (len < this.maxNum) {
      return true;
    } else if (len === this.maxNum && values.includes(obj.parentCode)) {
      return true;
    } else {
      return false;
    }
  }

  setCache(code: string, data) {
    try {
      let cacheAreaStr = sessionStorage.getItem('cacheAreaData') || '{}';
      let cacheArea = JSON.parse(cacheAreaStr);
      cacheArea[code] = data;
      let newCache = JSON.stringify(cacheArea);
      sessionStorage.setItem('cacheAreaData', newCache);
    } catch (e) {
    }
  }

  getCache(code: string) {
    try {
      let cacheAreaStr = sessionStorage.getItem('cacheAreaData') || '{}';
      let cacheArea = JSON.parse(cacheAreaStr);
      return cacheArea[code] || [];
    } catch (e) {
      return [];
    }
  }

  track(i, v) {
    return v.code;
  }

}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule
  ],
  declarations: [
    CitySelectComponent
  ],
  exports: [CitySelectComponent]
})
export class CitySelectModule {
}
