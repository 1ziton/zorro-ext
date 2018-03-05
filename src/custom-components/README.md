<p align="center">
  <a href="http://ng.ant.design">
    <img width="320" src="https://ng.ant.design/assets/img/zorro.svg">
  </a>
</p>

# ZORRO-EXT
[![Build Status](https://travis-ci.org/NG-ZORRO/ng-zorro-antd.svg?branch=master)](https://travis-ci.org/NG-ZORRO/ng-zorro-antd)
[![npm package](https://img.shields.io/npm/v/ng-zorro-antd.svg)](https://www.npmjs.org/package/ng-zorro-antd)
[![Gitter](https://badges.gitter.im/ng-zorro/ng-zorro-antd.svg)](https://gitter.im/ng-zorro/ng-zorro-antd?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

An enterprise-class UI components based on Ant Design and Angular.



## 现有业务组件

以下是对现有业务组件功能点，对应使用 `ZORRO` 组件封装说明。为了便于区分，公司内部扩展的业务组件都统一 `yzt-` 前缀，二次开发组件都在文档的 `YztUIComponent` 和 `YztBusinessComponent` 两个分类下


* [x]  **ui-select-box** UISelect (TODO:样式统一风格，或优化细节等)
* [x]  日期选择 `nz-datepicker`
* [x]  **yzt-grid** 表格 `nz-table` (扩展支持现有系统的悬浮列弹窗查询、图标等功能）
* [x]  **yzt-upload** 图片&文件上传 (`nz-upload` ）
* [x]  **yzt-area** 地址选择
* [x]  **yzt-area-multiple** (用现有地址选择组件，修改样式统一风格，或优化细节等）
* [ ]  区域树 (`zorro v0.6.10` 缺失tree组件）
* [ ]  字典选择 `nz-select` 扩展
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


## Features

- An enterprise-class UI design language for web applications.
- A set of high-quality Angular components out of the box.
- Written in TypeScript with complete define types.

## Environment Support

* Modern browsers and Internet Explorer 9+（with [polyfills](https://v2.angular.io/docs/ts/latest/guide/browser-support.html)）。

## Angular Version Support

* Angular`^5.0.0`


## Install

```bash
$ npm install ng-zorro-antd --save
```

## Development

```bash
$ git clone git@github.com:NG-ZORRO/ng-zorro-antd.git
$ npm install
$ npm start
```


## Links

- [Home page](http://ng.ant.design)
- [Angular](https://angular.io/)
- [Angular CLI](https://cli.angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS 5](https://github.com/ReactiveX/rxjs)


## Contributing

We welcome all contributions. Please read our [CONTRIBUTING.md](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CONTRIBUTING.md) first.
You can submit any ideas as [pull request](https://github.com/NG-ZORRO/ng-zorro-antd/pulls)，or as [GitHub issues](https://github.com/NG-ZORRO/ng-zorro-antd/issues)。
