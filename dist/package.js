(function() {

  window.Lib = window;

})();
(function(){
  "use strict";

  class View {

  }

  Lib.View = View;

}());
(function(){
  "use strict";

  class Base {
    on(event, callback) {
      this._events = this._events || [];
      this._events.push({event, callback});
    }

    trigger(event) {
      var args = Array.prototype.slice.call(arguments);
      args.shift();

      for(let e of this._events || []) {
        if(e.event == event) e.callback.apply(null, args);
      }
    }
  }

  Lib.Base = Base;

})();
(function(){
  "use strict";

  class Http {

    get(url) {

    }

    post(url, data) {

    }

    put(url, data) {

    }

    delete(url) {

    }

  }

  Lib.Http = Http;


}());
(function(){
  "use strict";

  class ListView extends Lib.View {
    constructor(props) {
      this.list = props.list;
    }

    render() {
      var self = this;
      let listNode = document.createElement(self.tagName || 'div');

      for (let model of self.list.models){
        renderAndAppendModelView(self, listNode, model);
      }

      self.el = listNode;

      self.list.on('add', function(model) {
        renderAndAppendModelView(self, listNode, model);
      });
    }
  }

  function renderModelView(listView, model) {
    let modelView = new listView.modelView({
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

}());
(function() {
  "use strict";

  class List extends Base {
    constructor(models) {
      models = models || [];

      this.model = this.model || Model;
      this.models = [];

      for(let obj of models) {
        this.add(obj);
      }
    }

    get idProperty() {
      return "id";
    }

    add(obj) {
      var model;

      // handle either a model or a plain js object
      if(isModel(obj)) model = obj;
      else model = new this.model(obj);

      // prevent adding two models with the same id
      var alreadyExists = this.find(m => {
        return m.get(this.idProperty) == model.get(this.idProperty);
      });

      if(model.get(this.idProperty) && alreadyExists) return;

      this.models.push(model);

      this.trigger('add', model);
    }

    find(expression) {
      for(let model of this.models) {
        if(expression(model)) return model;
      }
    }
  }

  function isModel(obj) {
    return !!obj.properties;
  }

  Lib.List = List;

}());
(function(){
  "use strict";

  class ModelView extends View {
    constructor(props) {
      this.model = props.model || new Lib.Model();
      if(this.init) this.init(props);
    }

    render() {
      if(!this.template) throw "ModelView must provide a template.";
      let templateStr = this.template(this.model.properties);

      // create the dom node
      let node = document.createElement(this.tagName || 'div');
      node.innerHTML = templateStr;
      this.el = node;

      // set up events
      setEvents(this);

      // set up bindings
      setBindings(this);

      if(this.onRender) this.onRender();
    }
  }

  function setEvents(view) {
    for(let key in view.events) {
      let tokens = key.split(" ");
      let eventStr = tokens[0];
      let selector = '';

      for(let i = 1; i < tokens.length; i++) {
        selector += tokens[i] + " ";
      }

      let nodes = view.el.querySelectorAll(selector);

      for(let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        node.addEventListener(eventStr, view.events[key]);
      }
    }
  }

  function setBindings(view) {
    for(let key in view.bindings){
      let propName = view.bindings[key];
      let nodes = view.el.querySelectorAll(key);

      for(let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        bindNodeToProperty(node, view.model, propName);
      }
    }
  }

  function bindNodeToProperty(node, model, propName){
    // todo: refactor this... make it configurable?

    if(node.tagName == 'INPUT'){
      node.value = model.get(propName);

      node.addEventListener('propertychange', function(){
        model.set(propName, this.value);
      });

      node.addEventListener('input', function(){
        model.set(propName, this.value);
      });

      node.addEventListener('change', function(){
        model.set(propName, this.value);
      });

      model.on('change:' + propName, function(val) {
        node.value = val;
      });
    }
    else{
      node.textContent = model.get(propName);

      model.on('change:' + propName, function(val) {
        node.textContent = val;
      });
    }
  }

  Lib.ModelView = ModelView;

})();
(function(){
  "use strict";

  class Model extends Base {
    constructor(properties) {
      this.properties = properties;
    }

    get(propName) {
      return this.properties[propName];
    }

    set(propName, value) {
      this.properties = this.properties || {};
      this.properties[propName] = value;
      
      for(let i in this._events){
        let e = this._events[i];

        this.trigger("change", value);
        this.trigger("change:" + propName, value);
      }
    }

    toJSON() {
      return JSON.stringify(this.properties);
    }
  }

  Lib.Model = Model;

})();

(function(){
  "use strict";

  class Region {
    show(view) {
      view.render();
      let container = document.querySelector(this.container);

      container.innerHTML = "";
      container.appendChild(view.el);

      if(view.onShow) view.onShow();
    }
  }

  Lib.Region = Region;

})();

(function() {
  "use strict";

  class Router {

  }

  Lib.Router = Router;

})();