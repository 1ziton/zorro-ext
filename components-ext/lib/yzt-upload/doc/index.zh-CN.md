---
category: Components-Ext
type: Business
title: Yzt-upload
subtitle: 上传组件
---

上传组件

## API

### yzt-upload

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[(fileList)]` | 支持双向绑定 | YztUploadFile[] | string | - |
| `type` | 样式类型 `basic`,`avatar`,`picture-card`,`picture`,`picture-inline`,`drag` | string | `basic` |
| `valueType` | 数组返回是url还是对象形式`string`,`array` | string | `array` |
| `fileSize` | 限制文件大小，单位：KB；0 表示不限 | number | 0 |
| `fileNum` | 限制上传文件数量，单位：个/张 | string/number | 50 |
| `fileAccept` | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | string | `image/*` |
| `disabled` | 禁用 | boolean | false |
| `fileType` | 限制文件类型，例如： image/png,image/jpeg,image/gif,image/bmp | string | - |
| `beforeUpload` | 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。注意：IE9 不支持该方法；注意：务必使用 => 定义处理方法。 | (file, fileList) => boolean | Observable |
| `source` | 来源是否为老系统，存在则为老系统 | string | '' |
| `action` | 控制可以跨后端接口(必选参数, 上传的地址) | string | `baseConfig/uploadFile` |
| `multiple` | 是否支持多选 | boolean | true |
