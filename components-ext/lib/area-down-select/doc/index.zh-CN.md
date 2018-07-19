---
category: Components-Ext
type: Business
title: Area-down
subtitle: 地址下拉选择组件
---

输入地址下拉选择

## API

### area-down

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[(ngModel)]` | 支持双向绑定 | object/string | - |
| `[valueType]` | 用于定制输出值类型,可选值为 `object` `fullObject` | string | - |
| `[areaName]` | 用于初始化回显对象(传具体地址) | string | - |
| `[width]` | 输入选择框宽度(支持`px` `%`) | string/number | `100%` |
| `[dropdownStyle]` | 下拉框样式(支持`px` `%`) | string | `100%` |
| `[rowsNum]` | 下拉选项数目 | number | 10 |
| `[customTemplate]` | 定制下拉选项 | TemplateRef | - |
