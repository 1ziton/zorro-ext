## 现有业务组件

以下是对现有业务组件功能点，对应使用 `ZORRO` 组件封装说明。为了便于区分，公司内部扩展的业务组件都统一 `yzt-` 前缀，二次开发组件都在文档的 `YztUIComponent` 和 `YztBusinessComponent` 两个分类下


* [x]  **ui-select-box** UISelect (TODO:样式统一风格，或优化细节等)
* [x]  日期选择 `nz-date-picker`
* [x]  **yzt-grid** 表格 `nz-table` (扩展支持现有系统的悬浮列弹窗查询、图标等功能）
* [x]  **yzt-upload** 图片&文件上传 (`nz-upload` ）
* [x]  **yzt-area** 地址选择
* [x]  **yzt-area-multiple** (用现有地址选择组件，修改样式统一风格，或优化细节等）
* [ ]  区域树 (`zorro v0.6.10` 缺失tree组件）
* [x]  字典选择 `nz-select` 扩展
* [x]  **yzt-department** `nz-select` (扩展自定义模板)
* [x]  **yzt-shipper** 发货人选择 `nz-select` 扩展
* [x]  **yzt-cnee** 收货人选择 `nz-select` 扩展
* [x]  **yzt-abnormal** 异常类型选择  `UISelect`扩展
* [x]  **yzt-master** 师傅名称/账号 `nz-select` 扩展
* [x]  **yzt-good** 品名选择 `nz-select` 扩展
* [x]  **yzt-repair-goods** 维修品名 `nz-select` 扩展
* [x]  **yzt-viewer** 图片预览组件 （可用现有指令`Viewer`）
* [x]  **[echarts]** Echarts指令 
* [ ]  G2指令 （可扩展封装：https://antv.alipay.com/zh-cn/g2/3.x/index.html ）

## TODO

记录自定义组件未修复及可以优化的地方

* [ ]  拖拽表格至边缘会出现1像素震动 (drag-box.directive.ts)
* [ ]  viewer预览组件可以扩展支持缩略图 (yzt-viewer.directive.ts)
* [ ]  select扩展加载下拉数据loading提示动画 (yzt-viewer.directive.ts)
* [ ]  `ui-select-box` 组件样式、细节需优化，优化后影响的组件将有`yzt-area`、`yzt-abnormal`


## Features（0.0.3）

- yzt-grid组件分页bug修复
- 选择类组件，支持回显功能

## Environment Support

* Modern browsers and Internet Explorer 9+（with [polyfills](https://v2.angular.io/docs/ts/latest/guide/browser-support.html)）。

## Angular Version Support

* Angular`^5.0.0`


## Install

```bash
$ npm install zorro-ext --save
```

## Sample Usage

add scripts `ace-builds` in your `index.html` or `angular-cli.json`

eg: 

```html
    <script src="./assets/ace-builds/src-noconflict/ace.js"></script>
```

```ts
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

    import { AppComponent } from './app.component';
    import { YztCustomModule } from 'zorro-ext-subin';
    import { NgZorroAntdModule } from 'ng-zorro-antd';
    import { HttpModule } from '@angular/http';
    import { RouterModule, PreloadAllModules } from '@angular/router';
    import { FormsModule } from '@angular/forms';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([], { useHash: true, preloadingStrategy: PreloadAllModules }),
        YztCustomModule.forRoot(API, 'URL') // 由于YZT组件依赖网络请求服务，必须在外部项目导入API服务及请求地址，保持npm包纯净
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
```

Important pieces to note in the AppModule: FormsModule、HttpModule、RouterModule、YztCustomModule is required in you angular project.

You can import independent component like CitySelectComponent in your module.

### Notice

If you use viewer component, you should add scripts `viewer.js` and styles `viewer.css` in your `index.html` or `angular-cli.json`
It is the same usaged by echarts and lodash

API service is specific newwork request, it`s used by specific developer
