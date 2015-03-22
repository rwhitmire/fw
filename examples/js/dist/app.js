"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

(function () {
  "use strict";

  var MyView = (function (_Lib$ModelView) {
    function MyView() {
      _classCallCheck(this, MyView);

      if (_Lib$ModelView != null) {
        _Lib$ModelView.apply(this, arguments);
      }
    }

    _inherits(MyView, _Lib$ModelView);

    _createClass(MyView, {
      template: {
        get: function () {
          return Handlebars.compile(document.getElementById("my-template").innerHTML);
        }
      },
      tagName: {
        get: function () {
          return "p";
        }
      },
      events: {
        get: function () {
          return {
            "click button": this.onClickButton };
        }
      },
      bindings: {
        get: function () {
          return {
            "[name=firstName]": "firstName",
            "[name=lastName]": "lastName",
            ".firstName-label": "firstName",
            ".lastName-label": "lastName" };
        }
      },
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
  })(Lib.ModelView);

  var MyRegion = (function (_Lib$Region) {
    function MyRegion() {
      _classCallCheck(this, MyRegion);

      if (_Lib$Region != null) {
        _Lib$Region.apply(this, arguments);
      }
    }

    _inherits(MyRegion, _Lib$Region);

    _createClass(MyRegion, {
      container: {
        get: function () {
          return "#main";
        }
      }
    });

    return MyRegion;
  })(Lib.Region);

  var myRegion = new MyRegion();

  var myModel = new Lib.Model({
    firstName: "Gob",
    lastName: "Bluth" });

  var myView = new MyView({
    model: myModel
  });

  myRegion.show(myView);

  var EmployeeListRegion = (function (_Lib$Region2) {
    function EmployeeListRegion() {
      _classCallCheck(this, EmployeeListRegion);

      if (_Lib$Region2 != null) {
        _Lib$Region2.apply(this, arguments);
      }
    }

    _inherits(EmployeeListRegion, _Lib$Region2);

    _createClass(EmployeeListRegion, {
      container: {
        get: function () {
          return "#employee-list";
        }
      }
    });

    return EmployeeListRegion;
  })(Lib.Region);

  var EmployeeModelView = (function (_Lib$ModelView2) {
    function EmployeeModelView() {
      _classCallCheck(this, EmployeeModelView);

      if (_Lib$ModelView2 != null) {
        _Lib$ModelView2.apply(this, arguments);
      }
    }

    _inherits(EmployeeModelView, _Lib$ModelView2);

    _createClass(EmployeeModelView, {
      template: {
        get: function () {
          return Handlebars.compile("{{ firstName }} {{ lastName }}");
        }
      }
    });

    return EmployeeModelView;
  })(Lib.ModelView);

  var EmployeeListView = (function (_Lib$ListView) {
    function EmployeeListView() {
      _classCallCheck(this, EmployeeListView);

      if (_Lib$ListView != null) {
        _Lib$ListView.apply(this, arguments);
      }
    }

    _inherits(EmployeeListView, _Lib$ListView);

    _createClass(EmployeeListView, {
      modelView: {
        get: function () {
          return EmployeeModelView;
        }
      }
    });

    return EmployeeListView;
  })(Lib.ListView);

  var employeeList = new Lib.List([{ firstName: "ryan", lastName: "whitmire" }, { firstName: "bill", lastName: "smith" }]);

  var employeeListView = new EmployeeListView({
    list: employeeList
  });

  var employeeListRegion = new EmployeeListRegion();

  employeeListRegion.show(employeeListView);

  setTimeout(function () {
    employeeList.add({ firstName: "bill", lastName: "walton" });
  }, 1000);
})();
//# sourceMappingURL=app.js.map