---
title: Table 自动生成 From
---

# Table 搜索

Pro-Table 会根据列来生成一个 From，用于筛选列表数据，最后的值会根据通过 `request` 的第一个参数返回，看起来就像。

```jsx | pure
<ProTable request={(params)=>{ all params}}>
```

按照规范，table 的表单不需要任何的必选参数，所有点击搜索和重置都会触发 `request`来发起一次查询。

From 的列是根据 `valueType` 来生成不同的类型。

> valueType 为 index indexBorder option 和没有 dataIndex 和 key 的列将会忽略。

| 类型 | 描述 |
| --- | --- |
| text | input |
| date | [DatePicker](https://ant.design/components/date-picker-cn/) |
| dateTime | [DatePicker](https://ant.design/components/date-picker-cn/#components-date-picker-demo-time) |
| time | [TimePicker](https://ant.design/components/time-picker-cn/) |
| money | inputNumber |

设置了 `valueEnum` 的列将会生成 Select,Select 会自动插入一个全部选项，并且默认选中，但是值为 `all` 在查询时会被丢弃。

## 相关 API

### Pro-Table

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onLoad | 数据加载完成后触发,会多次触发 | `(dataSource: T[]) => void` | - |
| beforeSearchSubmit | 搜索之前进行一些修改 | `(params:T)=>T` | - |
| search | 是否显示搜索表单 | boolean | true |
| momentFormat | moment 的格式化方式,默认会转化成 string | `"string" \| "number" \| false` | string |
| beforeSearchSubmit | 搜索之前进行一些修改 | `(params:T)=>T` | - |

### Columns

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| valueEnum | 值的枚举，会自动转化把值当成 key 来取出要显示的内容 | [valueEnum](#valueEnum) | - |
| valueType | 值的类型 | `'money' \| 'option' \| 'date' \| 'dateTime' \| 'time' \| 'text'\| 'index' \| 'indexBorder'` | 'text' |
| hideInSearch | 在查询表单中不展示此项 | boolean | - |
| hideInTable | 在 Table 中不展示此列 | boolean | - |
| renderFormItem | 渲染查询表单的输入组件 | `(item,props:{value,onChange}) => React.ReactNode` | - |

## Demo

<code src="./demo/search.tsx" />
