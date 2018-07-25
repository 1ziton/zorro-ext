<p align="center">
  <a href="http://ng.ant.design">
    <img width="230" src="https://img.alicdn.com/tfs/TB1FVMDosrI8KJjy0FhXXbfnpXa-200-200.svg">
  </a>
  <h3 style="text-align: center;"><a href="https://www.yztfe.top/zorro-ext">预览地址</a></h3>
</p>

## 现有业务组件

以下是对现有业务组件功能点，对应使用 `ZORRO` 组件封装说明。为了便于区分，公司内部扩展的业务组件都统一 `yzt-` 前缀，二次开发组件都在文档的 `YztUIComponent` 和 `YztBusinessComponent` 两个分类下

# UI Component
* [x]  **yzt-viewer** 图片预览组件 （可用现有指令`Viewer`）
* [x]  **[echarts]** Echarts指令
* [ ]  G2指令 （可扩展封装：https://antv.alipay.com/zh-cn/g2/3. /index.html ）

# UI Component
* [x]  **yzt-grid** 表格 `nz-table` (扩展支持现有系统的悬浮列弹窗查询、图标等功能）
* [x]  **area-down** 地址下拉输入组件 `nz-select` 扩展
* [ ]  **ui-select-box** UISelect (TODO:样式统一风格，或优化细节等)
* [ ]  日期选择 `nz-date-picker`
* [ ]  **yzt-upload** 图片&文件上传 (`nz-upload` ）
* [ ]  **yzt-area** 地址选择
* [ ]  **yzt-area-multiple** (用现有地址选择组件，修改样式统一风格，或优化细节等）
* [ ]  区域树 (`zorro v0.6.10` 缺失tree组件）
* [ ]  字典选择 `nz-select` 扩展
* [ ]  **yzt-department** `nz-select` (扩展自定义模板)
* [ ]  **yzt-shipper** 发货人选择 `nz-select` 扩展
* [ ]  **yzt-cnee** 收货人选择 `nz-select` 扩展
* [ ]  **yzt-abnormal** 异常类型选择  `UISelect`扩展
* [ ]  **yzt-master** 师傅名称/账号 `nz-select` 扩展
* [ ]  **yzt-good** 品名选择 `nz-select` 扩展
* [ ]  **yzt-repair-goods** 维修品名 `nz-select` 扩展

## TODO

记录自定义组件未修复及可以优化的地方

* [ ]  拖拽表格至边缘会出现1像素震动 (drag-box.directive.ts)
* [ ]  viewer预览组件可以扩展支持缩略图 (yzt-viewer.directive.ts)
* [ ]  select扩展加载下拉数据loading提示动画 (yzt-viewer.directive.ts)
* [ ]  `ui-select-box` 组件样式、细节需优化，优化后影响的组件将有`yzt-area`、`yzt-abnormal`

### Edit Doc Notice

#### 运行命令

* **npm run site:start**   本地运行
* **npm run doc**          打包部署

#### 组件文档基于Markdown文件生成，每个组件中都必须有以下目录

* **demo** 存放示例，通过.md文档生成对应的组件基本描述; .ts文件为具体的示例代码
* 组件生成规则，每个demo的选择器命名必须以'nz-demo-[组件名]-[demo文件名]',如：'nz-demo-echart-pie', 如果选择器的名字不符合此规则会报错,同理Component名字一样,必须以'NzDemo[组件名][demo文件名]'
* **doc**  描述组件基本属性，其中.md文件中'category'代表大类分组，'type'代表小类分组，'title'代表组件选择器
```
---
category: Components-Ext
type: Business
title: Area-down
---
```
* **index.ts** 为每个组件的入口文件
* **index.css** 每个demo的样式如果不是用styles: ['']的内嵌式,而是用引用方式,那么此css文件必须写在__domo__内部
* **share** share文件夹用来存放与对应组件相关的逻辑代码，在运行过程必须注意引入的路径，因为生成site文件夹后，目录结构跟开发过程前不一样，参考yzt-grid组件GridUtilService的导入

### Other

* 部署到github page上的docs文件是打包后的文件，这与zorro仓库上的docs（非组件类的md文档文件夹）有冲突，1ziton上的docs1就是原zorro仓库上的docs文件，故在push zorro仓库的时候要注意这个地方可能会有冲突影响，更新前把docs1文件改为docs文件

## Features（y1.0.0）

- 升级angular6.0版本，基于zorro1.0.0版本开发

## Environment Support

* Modern browsers and Internet Explorer 9+（with [polyfills](https://v2.angular.io/docs/ts/latest/guide/browser-support.html)）。

## Angular Version Support

* Angular`^6.0.0`
* Zorro`^1.0.0`


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

You can import independent component like CitySelectComponent in your modu