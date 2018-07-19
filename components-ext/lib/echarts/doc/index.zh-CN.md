---
category: Components-Ext
type: UI
title: echarts
subtitle: Echarts插件
---

图片预览

## API

### echarts

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 必填参数，Echarts的options参数，详情参看 http://echarts.baidu.com/ | Object | - |
| `dataset` | 可选参数，可通过dataset快速改变统计数据 | Array  | - |
| `theme` | 主题颜色 | String | - |
| `loading` | 图标加载动画效果，数据渲染慢的时候可以提升交互体验 | Boolean | false |
| `chartClick` | 图表点击事件 | EventEmitter | - |
| `chartDblClick` | 图表双击事件 | EventEmitter | - |
| `chartMouseDown` | 图表鼠标按下事件 | EventEmitter | - |
| `chartMouseUp` | 图表鼠标释放事件 | EventEmitter | - |
| `chartMouseOver` | 图表mouseover事件 | EventEmitter | - |
| `chartMouseOut` | 图表mouseout事件 | EventEmitter | - |
| `chartGlobalOut` | 图表全图mouseout事件 | EventEmitter | - |
