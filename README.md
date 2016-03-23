# LoadMaster说明

## API说明

```javascript
var loadMaster = new LoadMaster({
  container: window, //滚动的容器，默认是window的scroll，也可以指定div，可以传字符串或者原生element
  offset: window.innerHeight, //当前视觉屏以外的安全距离，提供像素数字，默认是容器的一屏高度
  threshold: window.innerHeight, //触发的区域高度，提供像素数字，默认是容器的一屏高度
  trigger: 'both', //触发的事件，有三个值above/below/both。both就是above和below事件都触发
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

- eles 都是原生的elements数组
- dir 为true的时候是往下滚，false为往上滚
- 事件回调里面的this对象都指向当前LoadMaster实例对象


```javascript
//eles 都是原生的elements数组

//当指定的元素移动到距离当前屏幕上方指定距离的时候调用的回调事件
loadMaster.on('above', function(eles, dir) {
  console.log(eles);
});

//当前屏幕的元素，如果dir为undefined则为默认进来的首屏
loadMaster.on('curr', function(eles, dir) {
  console.log(eles);
});

//当前屏幕滚动下方，进入触发区域的元素
loadMaster.on('below', function(eles, dir) {
  console.log(eles);
});

//滚动到容器地步，可以在这里绑定异步获取事件
loadMaster.on('end', function() {
  //添加dom，然后刷新触发元素
  this.refresh();
});
```
