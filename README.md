# LoadMaster说明

## API说明

```javascript
var loadMaster = new LoadMaster({
  container: window, //滚动的容器，默认是window的scroll，也可以指定div，可以传字符串或者原生element
  offset: window.innerHeight, //当前视觉屏以外的安全距离，提供像素数字，默认是容器的一屏高度
  threshold: window.innerHeight, //触发的区域高度，提供像素数字，默认是容器的一屏高度
  trigger: ['above', 'curr', 'below'], //触发的事件，有三个值above/below/curr。
  items: 'div', //触发的元素列表，提供选择字符串
  optimize: true, //是否做滚动优化
});

```

### refresh

刷新触发的元素列表，当添加了新的elements的时候调用

```javascript
//刷新触发的元素列表，当添加了新的elements的时候调用
loadMaster.refresh();
```

### off

移除滚动事件监听

```javascript
//移除滚动事件监听
loadMaster.off();
```

## 事件说明

- **eles** 都是原生的elements数组
- **dir** 为true的时候是往下滚，false为往上滚
- **top** 为当前滚动的距离高度
- **data** 为完整的业务对象数组，每个数组里面的对象都包含元素的`top`/`bottom`/`left`坐标值，`height`高度，`el`原生元素
  - [{ el: div, top: 0, left: 0, bottom: 0, height: 100 }]
- **isFast** 为是否是快速滚动
- 事件回调里面的this对象都指向当前LoadMaster实例对象


```javascript
//eles 都是原生的elements数组

//当指定的元素移动到距离当前屏幕上方指定距离的时候调用的回调事件
loadMaster.on('above', function(eles, dir, top, data, isFast) {
  console.log(eles);
});

//当前屏幕的元素，如果dir为undefined则为默认进来的首屏
loadMaster.on('curr', function(eles, dir, top, data, isFast) {
  console.log(eles);
});

//当前屏幕滚动下方，进入触发区域的元素
loadMaster.on('below', function(eles, dir, top, data, isFast) {
  console.log(eles);
});

//滚动到容器地步，可以在这里绑定异步获取事件
loadMaster.on('end', function() {
  //添加dom，然后刷新触发元素
  this.refresh();
});
```

## 方法说明

### calc
`LoadMaster`提供一个静态方法**calc**，专门用于计算元素在页面所处的坐标值
这个方法可以接受一个参数，这个参数可以是三种类型
- `string`接受选择字符串，会返回数组
- `el`原生的DOM元素，会返回对象
- `eles`原生的DOM元素数组，会返回数组

```javascript
LoadMaster.calc(el); // {el: div, top: 0, left: 0, bottom: 0, height: 100}
```
