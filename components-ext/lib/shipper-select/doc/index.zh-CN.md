---
category: Components-Ext
type: Business
title: Yzt-shipper
subtitle: 发货人下拉选择组件
---

发货人下拉选择组件

## API

### area-down

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[(ngModel)]` | 支持双向绑定 | object/string | - |
| `valueType` | 用于定制输出值类型,可选值为 `object` `fullObject` | string | - |
| `userCode` | 用于初始化回显对象(传发货人编码) | string | - |
| `OptionMode` | 下拉模式是单选还是多选（`multiple`） | string | 单选`default` |
| `clientType` | 套餐协议comboProcotol   客户品名协议productProcotol | string | - |
| `width` | 输入选择框宽度(支持`px` `%`) | string/number | `100%` |
| `dropdownStyle` | 下拉框样式(支持`px` `%`) | string | `100%` |
| `rowsNum` | 下拉选项数目 | number | 10 |
| `customTemplate` | 定制下拉选项 | TemplateRef | - |
