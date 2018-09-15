---
category: Components-Ext
type: Business
title: yzt-standard-good
subtitle: 品名下拉选择组件
---

品名下拉选择组件

## API

### yzt-standard-good

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[(ngModel)]` | 支持双向绑定 | object/string | - |
| `valueType` | 用于定制输出值类型,可选值为 `object` `fullObject` | string | - |
| `goodId` | 用于初始化回显对象(传品名ID) | string | - |
| `goodMode` | 下拉模式是单选还是多选（`multiple`） | string | 单选`default` |
| `width` | 输入选择框宽度(支持`px` `%`) | string/number | `100%` |
| `dropdownStyle` | 下拉框样式(支持`px` `%`) | string | `100%` |
| `rowsNum` | 下拉选项数目 | number | 10 |
| `customTemplate` | 定制下拉选项 | TemplateRef | - |
| `nzDisabled` | 是否禁用 | boolean | false |
| `(onChange)` | 选择选项回调 | EventEmitter | - |
| `(nzOpenChange)` | 打开或关闭下拉选择框回调 | EventEmitter | - |
