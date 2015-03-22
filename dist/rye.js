"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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

(function () {
  var View = (function () {
    function View() {
      _classCallCheck(this, View);
    }

    _createClass(View, {
      render: {
        value: function render() {
          console.log("rendering", this.el);
          var templateStr = this.template(this.model.properties);

          // create the dom node
          var node = document.createElement(this.tagName || "div");
          node.innerHTML = templateStr;
          this.el = node;

          // bind events
          setEvents(this);

          // setup bindings
          setBindings(this);

          if (this.onRender) this.onRender();
        }
      }
    });

    return View;
  })();

  function setEvents(view) {
    for (var key in view.events) {
      var i;
      var tokens = key.split(" ");

      var eventStr = tokens[0];
      var selector = "";

      for (i = 1; i < tokens.length; i++) {
        selector += tokens[i] + " ";
      }

      var nodes = view.el.querySelectorAll(selector);

      for (i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        node.addEventListener(eventStr, view.events[key]);
      }
    }
  }

  function setBindings(view) {
    for (var key in view.bindings) {
      var i;
      var propName = view.bindings[key];
      var nodes = view.el.querySelectorAll(key);

      for (i = 0; i < nodes.length; i++) {
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
    } else {
      node.textContent = model.get(propName);

      model.on("change:" + propName, function (val) {
        node.textContent = val;
      });
    }
  }

  window.View = View;
})();

var Model = (function () {
  function Model() {
    _classCallCheck(this, Model);
  }

  _createClass(Model, {
    get: {
      value: function get(propName) {
        return this.properties[propName];
      }
    },
    set: {
      value: function set(propName, value) {
        this.properties[propName] = value;

        for (var i in this._events) {
          var e = this._events[i];
          // trigger "change" events
          if (e.eventDescription == "change") e.callback(value);

          // trigger "change:propName" events
          if (e.eventDescription == "change:" + propName) e.callback(value);
        }
      }
    },
    on: {
      value: function on(eventDescription, callback) {
        this._events = this._events || [];
        this._events.push({ eventDescription: eventDescription, callback: callback });
      }
    }
  });

  return Model;
})();

var MyModel = (function (_Model) {
  function MyModel(properties) {
    _classCallCheck(this, MyModel);

    this.properties = properties;
  }

  _inherits(MyModel, _Model);

  return MyModel;
})(Model);

var MyView = (function (_View) {
  function MyView(params) {
    _classCallCheck(this, MyView);

    this.model = params.model;
    this.template = Handlebars.compile(document.getElementById("my-template").innerHTML);
    this.tagName = "p";

    this.events = {
      "click button": this.onClickButton };

    this.bindings = {
      "[name=firstName]": "firstName",
      "[name=lastName]": "lastName",
      ".firstName-label": "firstName",
      ".lastName-label": "lastName" };
  }

  _inherits(MyView, _View);

  _createClass(MyView, {
    onRender: {
      value: function onRender() {
        console.log("done rendering", this.el);
      }
    },
    onShow: {
      value: function onShow() {
        console.log("el placed in dom", this.el);
      }
    },
    onClickButton: {
      value: function onClickButton() {
        alert("clicked.");
      }
    }
  });

  return MyView;
})(View);

var MyRegion = (function (_Region) {
  function MyRegion() {
    _classCallCheck(this, MyRegion);

    this.container = "#main";
  }

  _inherits(MyRegion, _Region);

  return MyRegion;
})(Region);

var myRegion = new MyRegion();

var myModel = new MyModel({
  firstName: "Gob",
  lastName: "Bluth" });

var myView = new MyView({
  model: myModel
});

myRegion.show(myView);
//# sourceMappingURL=rye.js.map