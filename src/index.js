import EventEmitter from 'events';

const defaults = {
  container: window, //容器
  threshold: window.innerHeight, //触发的区域
  offset: window.innerHeight, //触发安全间距
  trigger: ['above', 'curr', 'below'],
  event: 'scroll', //触发事件
  items: null,
  optimize: true, //是否做滚动优化
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
};

const calc = (el) => {
  let rect = el.getBoundingClientRect();

  return {
    el,
    bottom: rect.top + document.body.scrollTop + el.offsetHeight,
    height: el.offsetHeight,
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
};

export default class LoadMaster extends EventEmitter {
  static calc(eles) {
    if (typeof eles == 'string') eles = document.querySelectorAll(eles);
    let r;
    if (eles.length) {
      r = each(eles, (el, i) => {
        return calc(el);
      });
    } else {
      r = calc(eles);
    }
    return r;
  }

  constructor(options) {
    super();

    this.opts = extend({}, defaults, options);

    this.container = typeof this.opts.container == 'string' ?
      document.querySelector(this.opts.container) :
      this.opts.container;

    this.isWindowContainer = this.container === window;
    let currTop = document.body.scrollTop;

    if (!this.isWindowContainer) {
      !options.threshold && (this.opts.threshold = this.container.offsetHeight);
      !options.offset && (this.opts.offset = this.container.offsetHeight);
      currTop = this.container.scrollTop;
    }

    this.on('newListener', (event, listener) => {
      if (event == 'curr') {
        setTimeout(() => {
          this.curr(currTop, undefined);
        }, 0);
      }
    });

    this._meta();
    this.bind();
  }

  _meta() {
    if (this.opts.items !== null) {
      this.eles = this.isWindowContainer ?
        document.querySelectorAll(this.opts.items) :
        this.container.querySelectorAll(this.opts.items);

      this.items = each(this.eles, (el, i) => extend({index: i}, calc(el)));
    } else {
      this.eles = null
      this.items = null
    }
  }

  _scroll(e) {
    let t = 0;
    let target = e.target;

    if (this.isWindowContainer) t = document.body.scrollTop;
    else t = e.target.scrollTop;

    let isForward = t > this.lastTop;

    if (this.items !== null) {
      let absTop = Math.abs(t - this.lastTop);
      let isFast = absTop > this.opts.offset;

      if (isFast) {
        let p = parseInt(absTop / this.opts.offset) + 1;
        let ts = [];
        for (let i = 0; i < p; i++) {
          ts.push(this.lastTop + (i * this.opts.offset * (isForward ? 1 : -1)));
        }
        ts.push(t);
        ts.map((t) => {
          this.opts.trigger.map(d => {
            this[d](t, isForward, isFast);
          });
        });
      } else {
        this.opts.trigger.map(d => {
          this[d](t, isForward, isFast);
        });
      }
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

  bind() {
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

    this.container.addEventListener(this.opts.optimize ? 'optimizedScroll' : 'scroll', this._scrollHandle);
  }

  above(top, dir, isFast) {
    let k = top - this.opts.offset;
    let t = k - this.opts.threshold;
    let eles = this.items.filter(d => {
      return d.bottom > t && d.bottom < k;
    });

    if (eles.length) this.emit('above', eles.map(d => d.el), dir, top, eles, isFast);
  }

  curr(top, dir, isFast) {
    let k = top + window.innerHeight;
    let eles = this.items.filter(d => {
      return (d.top >= top && d.top <= k) || (d.bottom >= top && d.bottom <= k);
    });

    if (eles.length) this.emit('curr', eles.map(d => d.el), dir, top, eles, isFast);
  }

  below(top, dir, isFast) {
    let k = top + this.opts.offset;
    let t = k + this.opts.threshold;
    let eles = this.items.filter(d => {
      return d.top > k && d.top < t;
    });

    if (eles.length) this.emit('below', eles.map(d => d.el), dir, top, eles, isFast);
  }

  refresh() {
    this._meta();
  }

  off() {
    this.container.removeEventListener(this.opts.optimize ? 'optimizedScroll' : 'scroll', this._scrollHandle);
  }
}
