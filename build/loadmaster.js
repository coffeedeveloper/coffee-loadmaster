(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('events'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.events);
	    global.LoadMaster = mod.exports;
	  }
	})(this, function (exports, _events) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.LoadMaster = undefined;

	  var _events2 = _interopRequireDefault(_events);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  var _createClass = function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }

	    return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) defineProperties(Constructor, staticProps);
	      return Constructor;
	    };
	  }();

	  function _possibleConstructorReturn(self, call) {
	    if (!self) {
	      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }

	    return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	  }

	  function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	    }

	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	      constructor: {
	        value: subClass,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	  }

	  var defaults = {
	    container: window, //容器
	    threshold: window.innerHeight, //触发的区域
	    offset: window.innerHeight, //触发安全间距
	    trigger: 'both',
	    event: 'scroll', //触发事件
	    items: null,
	    optimize: true };

	  //是否做滚动优化
	  var each = function each(arr, cb) {
	    var len = arr.length;
	    var r = [];

	    for (var i = 0; i < len; i++) {
	      r.push(cb(arr[i], i));
	    }return r;
	  };

	  var extend = function extend(target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var arg = arguments[i];
	      for (var p in arg) {
	        target[p] = arg[p];
	      }
	    }
	    return target;
	  };

	  var LoadMaster = exports.LoadMaster = function (_EventEmitter) {
	    _inherits(LoadMaster, _EventEmitter);

	    function LoadMaster(options) {
	      _classCallCheck(this, LoadMaster);

	      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LoadMaster).call(this));

	      _this.opts = extend({}, defaults, options);

	      _this.container = typeof _this.opts.container == 'string' ? document.querySelector(_this.opts.container) : _this.opts.container;

	      _this.isWindowContainer = _this.container === window;

	      if (!_this.isWindowContainer) {
	        !options.threshold && (_this.opts.threshold = _this.container.offsetHeight);
	        !options.offset && (_this.opts.offset = _this.container.offsetHeight);
	      }

	      _this._meta();
	      _this._bindEvent();
	      return _this;
	    }

	    _createClass(LoadMaster, [{
	      key: '_meta',
	      value: function _meta() {
	        this.eles = this.isWindowContainer ? document.querySelectorAll(this.opts.items) : this.container.querySelectorAll(this.opts.items);

	        this.items = each(this.eles, function (el, i) {
	          var rect = el.getBoundingClientRect();

	          return {
	            el: el,
	            bottom: rect.top + document.body.scrollTop + el.offsetHeight,
	            height: el.offsetHeight,
	            top: rect.top + document.body.scrollTop,
	            left: rect.left + document.body.scrollLeft
	          };
	        });
	      }
	    }, {
	      key: '_scroll',
	      value: function _scroll(e) {
	        var _this2 = this;

	        var t = 0;
	        var target = e.target;

	        if (this.isWindowContainer) t = document.body.scrollTop;else t = e.target.scrollTop;

	        var isForward = t > this.lastTop;

	        var absTop = Math.abs(t - this.lastTop);
	        var isFast = absTop > this.opts.offset;

	        if (isFast) {
	          var p = parseInt(absTop / this.opts.offset) + 1;
	          var ts = [];
	          for (var i = 0; i < p; i++) {
	            ts.push(this.lastTop + i * this.opts.offset);
	          }
	          !isForward && ts.reverse();
	          ts.push(t);
	          ts.map(function (t) {
	            if (_this2.opts.trigger == 'both') {
	              _this2.above(t, isForward);
	              _this2.below(t, isForward);
	            } else {
	              _this2[_this2.opts.trigger](t, isForward);
	            }
	          });
	        } else {
	          if (this.opts.trigger == 'both') {
	            this.above(t, isForward);
	            this.below(t, isForward);
	          } else {
	            this[this.opts.trigger](t, isForward);
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
	    }, {
	      key: '_bindEvent',
	      value: function _bindEvent() {
	        var throttle = function throttle(type, name, obj) {
	          obj = obj || window;
	          var running = false;
	          var func = function func(e) {
	            if (running) return;
	            running = true;
	            setTimeout(function () {
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
	    }, {
	      key: 'above',
	      value: function above(top, dir, isFast, absTop) {
	        var _this3 = this;

	        var eles = this.items.filter(function (d) {
	          return d.bottom > top - _this3.opts.offset - _this3.opts.threshold && d.bottom < top - _this3.opts.offset;
	        }).map(function (d) {
	          return d.el;
	        });

	        if (eles.length) this.emit('above', eles, dir, isFast);
	      }
	    }, {
	      key: 'below',
	      value: function below(top, dir, isFast, absTop) {
	        var _this4 = this;

	        var eles = this.items.filter(function (d) {
	          return d.top > top + _this4.opts.offset && d.top < top + _this4.opts.offset + _this4.opts.threshold;
	        }).map(function (d) {
	          return d.el;
	        });

	        if (eles.length) this.emit('below', eles, dir, isFast);
	      }
	    }, {
	      key: 'refresh',
	      value: function refresh() {
	        this._meta();
	      }
	    }, {
	      key: 'off',
	      value: function off() {
	        this.container.removeEventListener('optimizedScroll', this._scrollHandle);
	      }
	    }]);

	    return LoadMaster;
	  }(_events2.default);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }
/******/ ])
});
;