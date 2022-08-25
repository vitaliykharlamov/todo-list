// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script/сreationFunctions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Todo = void 0;
exports.createToDo = createToDo;

function elementsCreate(tagName, className, id, action, type) {
  var element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (id) {
    element.dataset.id = id;
  }

  if (action) {
    element.dataset.action = action;
  }

  if (type) {
    element.type = type;
  }

  return element;
}

function createToDo(id) {
  var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var isCompleted = arguments.length > 2 ? arguments[2] : undefined;
  var li = elementsCreate('li', isCompleted ? 'todo__item todo__item_completed' : 'todo__item', id);
  var label = elementsCreate('label', 'todo__label');
  var input = elementsCreate('input', 'todo__checkbox', '', 'cross', 'checkbox');
  var div = elementsCreate('div', 'todo__switch');
  var span = elementsCreate('span', 'todo__text');
  var button = elementsCreate('button', 'todo__delete', '', 'remove');
  li.append(label, button);
  label.append(input, div, span);
  input.checked = isCompleted;
  span.append(description);
  button.append('X');
  return li;
}

var Todo = function Todo(id, value, bool) {
  this.id = id;
  this.description = value;
  this.isCompleted = bool;
};

exports.Todo = Todo;
},{}],"script/elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listTask = exports.fieldEntry = exports.buttonAdd = void 0;
var fieldEntry = document.querySelector('.todo__input');
exports.fieldEntry = fieldEntry;
var buttonAdd = document.querySelector('.todo__button');
exports.buttonAdd = buttonAdd;
var listTask = document.querySelector('.todo__list');
exports.listTask = listTask;
},{}],"script/connectionLocalStorage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports.todos = void 0;

var _сreationFunctions = require("./\u0441reationFunctions.js");

var _elements = require("./elements.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
exports.todos = todos;

function render() {
  var todoItems = todos.map(function (item) {
    return (0, _сreationFunctions.createToDo)(item.id, item.description, item.isCompleted);
  });

  _elements.listTask.append.apply(_elements.listTask, _toConsumableArray(todoItems));
}
},{"./сreationFunctions.js":"script/сreationFunctions.js","./elements.js":"script/elements.js"}],"script/addEventListeners.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventListeners = eventListeners;

var _elements = require("./elements.js");

var _сreationFunctions = require("./\u0441reationFunctions.js");

var _connectionLocalStorage = require("./connectionLocalStorage.js");

function eventListeners() {
  _elements.fieldEntry.addEventListener('input', function (event) {
    return _elements.buttonAdd.disabled = event.currentTarget.value === '';
  });

  _elements.buttonAdd.addEventListener('click', function () {
    var id = _connectionLocalStorage.todos.length >= 1 ? _connectionLocalStorage.todos.at(-1).id + 1 : 1;
    var todo = new _сreationFunctions.Todo(id, _elements.fieldEntry.value, false);
    var newTodoItem = (0, _сreationFunctions.createToDo)(todo.id, todo.description, todo.isCompleted);

    _connectionLocalStorage.todos.push(todo);

    _elements.listTask.append(newTodoItem);

    localStorage.setItem('todos', JSON.stringify(_connectionLocalStorage.todos));
    _elements.fieldEntry.value = '';
    _elements.buttonAdd.disabled = true;
  });

  _elements.listTask.addEventListener('click', function (event) {
    switch (event.target.dataset.action) {
      case 'remove':
        {
          var li = event.target.closest('.todo__item');
          li.remove();

          var index = _connectionLocalStorage.todos.findIndex(function (todo) {
            return todo.id === +li.dataset.id;
          });

          _connectionLocalStorage.todos.splice(index, 1);

          localStorage.setItem('todos', JSON.stringify(_connectionLocalStorage.todos));
          break;
        }

      case 'cross':
        {
          var _li = event.target.closest('.todo__item');

          _li.classList.toggle('todo__item_completed');

          var todo = _connectionLocalStorage.todos.find(function (todo) {
            return todo.id === +_li.dataset.id;
          });

          todo.isCompleted = !todo.isCompleted;
          localStorage.setItem('todos', JSON.stringify(_connectionLocalStorage.todos));
          break;
        }

      default:
        break;
    }
  });
}
},{"./elements.js":"script/elements.js","./сreationFunctions.js":"script/сreationFunctions.js","./connectionLocalStorage.js":"script/connectionLocalStorage.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _connectionLocalStorage = require("./script/connectionLocalStorage.js");

var _addEventListeners = require("./script/addEventListeners.js");

(0, _connectionLocalStorage.render)();
(0, _addEventListeners.eventListeners)();
},{"./script/connectionLocalStorage.js":"script/connectionLocalStorage.js","./script/addEventListeners.js":"script/addEventListeners.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62841" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map