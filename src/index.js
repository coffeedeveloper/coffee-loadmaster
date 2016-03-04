import EventEmitter from 'events';

const defaults = {
  container: window, //容器
  threshold: window.innerHeight, //触发的区域
  offset: window.innerHeight, //触发安全间距
  trigger: 'both',
  event: 'scroll', //触发事件
  items: null,
};

const each = (arr, cb) => {
  let len = arr.length;
  let r = [];

  for (let i = 0; i < len; i++) r.push(cb(arr[i], i));

  return r;
};

const extend = function(target) {
  for (let i = 1; i < arguments.length; i++) {
    let arg = arguments[i];
    for (let p in arg) target[p] = arg[p];
  }
  return target;
}

export class LoadMaster extends EventEmitter {
  constructor(options) {
    super();

    this.opts = extend({}, defaults, options);

    this.container = typeof this.opts.container == 'string' ?
      document.querySelector(this.opts.container) :
      this.opts.container;

    this.isWindowContainer = this.container === window;

    if (!this.isWindowContainer) {
      !options.threshold && (this.opts.threshold = this.container.offsetHeight);
      !options.offset && (this.opts.offset = this.container.offsetHeight);
    }

    this._meta();
    this._bindEvent();
  }

  _meta() {
    this.eles = this.isWindowContainer ?
      document.querySelectorAll(this.opts.items) :
      this.container.querySelectorAll(this.opts.items);

    this.items = each(this.eles, (el, i) => {
      let rect = el.getBoundingClientRect();

      return {
        el,
        bottom: rect.top + document.body.scrollTop + el.offsetHeight,
        height: el.offsetHeight,
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    });
  }

  _scroll(e) {
    let t = 0;
    let target = e.target;

    if (this.isWindowContainer) t = document.body.scrollTop;
    else t = e.target.scrollTop;

    let isForward = t > this.lastTop;

    if (this.opts.trigger == 'both') {
      this.above(t, isForward);
      this.below(t, isForward);
    } else {
      this[this.opts.trigger](t);
    }

    if (isForward) {
      if (this.isWindowContainer) {
        if (t + window.innerHeight > document.body.clientHeight - this.opts.offset) {
          this.emit('end');
        }
      } else {
        if (t + target.offsetHeight > target.scrollHeight - this.opts.offset) {
          this.emit('end');
        }
      }
    }

    this.lastTop = t;
  }

  _bindEvent() {
    const throttle = (type, name, obj) => {
      obj = obj || window;
      var running = false;
      var func = function(e) {
        if (running) return;
        running = true;
        setTimeout(function() {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
        }, 20);
      };
      obj.addEventListener(type, func);
    };
    throttle('scroll', 'optimizedScroll', this.container);

    this.lastTop = 0;
    this._scrollHandle = this._scroll.bind(this);

    this.container.addEventListener('optimizedScroll', this._scrollHandle);
  }

  above(top, dir) {
    let eles = this.items.filter(d => {
      return d.bottom > top - this.opts.offset - this.opts.threshold &&
              d.bottom < top - this.opts.offset;
    }).map(d => d.el);

    if (eles.length) this.emit('above', eles, dir);
  }

  below(top, dir) {
    let eles = this.items.filter(d => {
      return d.top > top + this.opts.offset &&
              d.top < top + this.opts.offset + this.opts.threshold;
    }).map(d => d.el);

    if (eles.length) this.emit('below', eles, dir);
  }

  refresh() {
    this._meta();
  }

  off() {
    this.container.removeEventListener('optimizedScroll', this._scrollHandle);
  }
}
