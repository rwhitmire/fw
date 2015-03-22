"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

(function () {

  window.Lib = window;
})();
(function () {
  "use strict";

  var View = function View() {
    _classCallCheck(this, View);
  };

  Lib.View = View;
})();
(function () {
  "use strict";

  var Base = (function () {
    function Base() {
      _classCallCheck(this, Base);
    }

    _createClass(Base, {
      on: {
        value: function on(event, callback) {
          this._events = this._events || [];
          this._events.push({ event: event, callback: callback });
        }
      },
      trigger: {
        value: function trigger(event) {
          var args = Array.prototype.slice.call(arguments);
          args.shift();

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (this._events || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var e = _step.value;

              if (e.event == event) e.callback.apply(null, args);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
    });

    return Base;
  })();

  Lib.Base = Base;
})();
(function () {
  "use strict";

  var Http = (function () {
    function Http() {
      _classCallCheck(this, Http);
    }

    _createClass(Http, {
      get: {
        value: function get(url) {}
      },
      post: {
        value: function post(url, data) {}
      },
      put: {
        value: function put(url, data) {}
      },
      "delete": {
        value: function _delete(url) {}
      }
    });

    return Http;
  })();

  Lib.Http = Http;
})();
(function () {
  "use strict";

  var ListView = (function (_Lib$View) {
    function ListView(props) {
      _classCallCheck(this, ListView);

      this.list = props.list;
    }

    _inherits(ListView, _Lib$View);

    _createClass(ListView, {
      render: {
        value: function render() {
          var self = this;
          var listNode = document.createElement(self.tagName || "div");

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = self.list.models[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var model = _step.value;

              renderAndAppendModelView(self, listNode, model);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          self.el = listNode;

          self.list.on("add", function (model) {
            renderAndAppendModelView(self, listNode, model);
          });
        }
      }
    });

    return ListView;
  })(Lib.View);

  function renderModelView(listView, model) {
    var modelView = new listView.modelView({
      model: model
    });

    modelView.render();
    return modelView;
  }

  function appendModelView(node, modelView) {
    node.appendChild(modelView.el);
  }

  function renderAndAppendModelView(listView, node, model) {
    var modelView = renderModelView(listView, model);
    appendModelView(node, modelView);
  }

  Lib.ListView = ListView;
})();
(function () {
  "use strict";

  var List = (function (_Base) {
    function List(models) {
      _classCallCheck(this, List);

      models = models || [];

      this.model = this.model || Model;
      this.models = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = models[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var obj = _step.value;

          this.add(obj);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    _inherits(List, _Base);

    _createClass(List, {
      idProperty: {
        get: function () {
          return "id";
        }
      },
      add: {
        value: function add(obj) {
          var _this = this;

          var model;

          // handle either a model or a plain js object
          if (isModel(obj)) model = obj;else model = new this.model(obj);

          // prevent adding two models with the same id
          var alreadyExists = this.find(function (m) {
            return m.get(_this.idProperty) == model.get(_this.idProperty);
          });

          if (model.get(this.idProperty) && alreadyExists) {
            return;
          }this.models.push(model);

          this.trigger("add", model);
        }
      },
      find: {
        value: function find(expression) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.models[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var model = _step.value;

              if (expression(model)) return model;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
    });

    return List;
  })(Base);

  function isModel(obj) {
    return !!obj.properties;
  }

  Lib.List = List;
})();
(function () {
  "use strict";

  var ModelView = (function (_View) {
    function ModelView(props) {
      _classCallCheck(this, ModelView);

      this.model = props.model || new Lib.Model();
      if (this.init) this.init(props);
    }

    _inherits(ModelView, _View);

    _createClass(ModelView, {
      render: {
        value: function render() {
          if (!this.template) throw "ModelView must provide a template.";
          var templateStr = this.template(this.model.properties);

          // create the dom node
          var node = document.createElement(this.tagName || "div");
          node.innerHTML = templateStr;
          this.el = node;

          // set up events
          setEvents(this);

          // set up bindings
          setBindings(this);

          if (this.onRender) this.onRender();
        }
      }
    });

    return ModelView;
  })(View);

  function setEvents(view) {
    for (var key in view.events) {
      var tokens = key.split(" ");
      var eventStr = tokens[0];
      var selector = "";

      for (var i = 1; i < tokens.length; i++) {
        selector += tokens[i] + " ";
      }

      var nodes = view.el.querySelectorAll(selector);

      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        node.addEventListener(eventStr, view.events[key]);
      }
    }
  }

  function setBindings(view) {
    for (var key in view.bindings) {
      var propName = view.bindings[key];
      var nodes = view.el.querySelectorAll(key);

      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        bindNodeToProperty(node, view.model, propName);
      }
    }
  }

  function bindNodeToProperty(node, model, propName) {
    // todo: refactor this... make it configurable?

    if (node.tagName == "INPUT") {
      node.value = model.get(propName);

      node.addEventListener("propertychange", function () {
        model.set(propName, this.value);
      });

      node.addEventListener("input", function () {
        model.set(propName, this.value);
      });

      node.addEventListener("change", function () {
        model.set(propName, this.value);
      });

      model.on("change:" + propName, function (val) {
        node.value = val;
      });
    } else {
      node.textContent = model.get(propName);

      model.on("change:" + propName, function (val) {
        node.textContent = val;
      });
    }
  }

  Lib.ModelView = ModelView;
})();
(function () {
  "use strict";

  var Model = (function (_Base) {
    function Model(properties) {
      _classCallCheck(this, Model);

      this.properties = properties;
    }

    _inherits(Model, _Base);

    _createClass(Model, {
      get: {
        value: function get(propName) {
          return this.properties[propName];
        }
      },
      set: {
        value: function set(propName, value) {
          this.properties = this.properties || {};
          this.properties[propName] = value;

          for (var i in this._events) {
            var e = this._events[i];

            this.trigger("change", value);
            this.trigger("change:" + propName, value);
          }
        }
      },
      toJSON: {
        value: function toJSON() {
          return JSON.stringify(this.properties);
        }
      }
    });

    return Model;
  })(Base);

  Lib.Model = Model;
})();

(function () {
  "use strict";

  var Region = (function () {
    function Region() {
      _classCallCheck(this, Region);
    }

    _createClass(Region, {
      show: {
        value: function show(view) {
          view.render();
          var container = document.querySelector(this.container);

          container.innerHTML = "";
          container.appendChild(view.el);

          if (view.onShow) view.onShow();
        }
      }
    });

    return Region;
  })();

  Lib.Region = Region;
})();

(function () {
  "use strict";

  var Router = function Router() {
    _classCallCheck(this, Router);
  };

  Lib.Router = Router;
})();
//# sourceMappingURL=package.js.map