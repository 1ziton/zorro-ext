---
category: Components-Ext
type: Business
title: yzt-grid
cols: 1
---

表格

## API

### yzt-grid
#### 基本属性
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `data` | 表格数据(对象格式包含content字段的数组) | {content: []} | - |
| `columns` | 表头字段及表格所需属性 | Array | - |
| `id` | 表格唯一标识，用于保存用户操作编辑列后的记忆 | String | - |
| `mulitipy` | 是否显示多选框 | Boolean | false |
| `selection` | 支持双向数据绑定，单选返回一个对象多选返回数组 | - | - |
| `load` | 支持数据懒加载，返回列表参数 | callback | (Output) |
| `isSyncData` | 是否异步数据 | Boolean | false |
| `showTitle` | 显示表格标题栏，配合title属性传值(string|TemplateRef)使用 | Boolean | false |
| `pageSize` | 页码（支持双向数据绑定） | Number | 10 |
| `showPagination` | 是否显示分页 | Boolean | true |
| `pageSizeValues` | 设置表格下拉选项数目 | Array | [10, 30, 50, 100] |
| `hideCheck` | 是否有全选选择框 | Boolean | false |
| `scroll` | 表格内容固定宽高 | Object eg:{x: '600px', y: '360px'} | - |
| `title` | 表格头部扩展 | TemplateRef/String | - |
| `csPopover` | 悬浮弹窗(配合columns的popover使用) | TemplateRef | - |
| `extraTitle` | 表头和内容之间可自定义行，类似Title | TemplateRef | - |
| `colColor` | 根据行状态更换行颜色，现支持时效预警（unnormal,prewarning,warning,timeOut），正常与删除状态（delete）| ```{field: "status", normal: "normal"}```| - |
| `selectionChange` | 选中列表数据的回调 | callback | (Output) |
| `cellClick` | 点击一条列表数据的回调 | fn(event: Event, row: any, field: any) | (Output) |
| `cellOver` | 鼠标移进一条列表数据的回调 | fn(event: Event, row: any, field: any) | (Output) |
| `exportCSV` | 前端导出回调 | fn(grid, data, isFailed?: boolean) | (Output) |

#### columns可用属性（单元格的扩展）
| 字段 | 说明 | 接受说明（String） |
| --- | --- | --- |
| `header` | 表头名称 | - |
| `field` | 表头标识 | - |
| `width` | 单元格宽度 | 不要加单位eg:'22px','22%' |
| `link` | 内容可点击 | true/false |
| `thumbnail` | 缩略图 | true/false |
| `frozenLeft` | 左侧冻列（不能同时使用左右同时冻列） | true/false |
| `frozenRight` | 右侧冻列（不能同时使用左右同时冻列） | true/false |
| `textLength` | 超过多少个字在表格省略并出现悬浮框显示全部文本 | 默认20个字，'10' |
| `popover` | 自定义悬浮框（配合csPopover传TemolateRef） | 必传'_customTpl' |

#### 自定义单元格模板
| 组件 | 说明 | 用法 |
| --- | --- | --- |
| `grid-icon` | 单元格自定义图标 | 必传属性ui_grid为当前表格模板变量 ```<grid-icon [ui_grid]="grid_basic" [outField]="'totalFee'">``` |
| `custom-template` | 单元格自定义操作按钮 | 必传属性ui_grid为当前表格模板变量 ```<custom-template [ui_grid]="grid_basic" [outField]="'operate'">``` |

#### 待扩展
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `searchTmpl` | 配合columns字段传入TemplateRef，显示字段下方的搜索框 | - | - |