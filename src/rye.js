class Region {
  show(view) {
    view.render();
    var container = Sizzle(this.container)[0];

    container.innerHTML = "";
    container.appendChild(view.el);

    if(view.onShow) view.onShow();
  }
}

(function(){

  class View {
    render() {
      console.log('rendering', this.el);
      var templateStr = this.template(this.model.properties);

      // create the dom node
      var node = document.createElement(this.tagName || 'div');
      node.innerHTML = templateStr;
      this.el = node;

      // bind events
      setEvents(this);

      // setup bindings
      setBindings(this);

      if(this.onRender) this.onRender();
    }
  }

  function setEvents(view) {
    for(var key in view.events) {
      var i;
      var tokens = key.split(" ");

      var eventStr = tokens[0];
      var selector = '';

      for(i = 1; i < tokens.length; i++) {
        selector += tokens[i] + " ";
      }

      var nodes = Sizzle(selector, view.el);

      for(i in nodes) {
        var node = nodes[i];
        node.addEventListener(eventStr, view.events[key]);
      }
    }
  }

  function setBindings(view) {
    for(var key in view.bindings){
      var i;
      var propName = view.bindings[key];
      var nodes = Sizzle(key, view.el);

      for(i in nodes) {
        var node = nodes[i];
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
    }
    else{
      node.textContent = model.get(propName);

      model.on('change:' + propName, function(val) {
        node.textContent = val;
      });
    }
  }

  window.View = View;

})();


class Model {
  get(propName) {
    return this.properties[propName];
  }

  set(propName, value) {
    this.properties[propName] = value;
    
    for(var i in this._events){
      var e = this._events[i];
      // trigger "change" events
      if(e.eventDescription == "change") e.callback(value);

      // trigger "change:propName" events
      if(e.eventDescription == "change:" + propName) e.callback(value);
    }
  }

  on(eventDescription, callback) {
    this._events = this._events || [];
    this._events.push({eventDescription, callback});
  }
}


class MyModel extends Model {
  constructor(properties) {
    this.properties = properties;
  }
}


class MyView extends View {
  constructor(params) {
    this.model = params.model;
    this.template = Handlebars.compile(document.getElementById('my-template').innerHTML);
    this.tagName = 'p';

    this.events = {
      'click button': this.onClickButton,
    };

    this.bindings = {
      "[name=firstName]": 'firstName',
      "[name=lastName]": 'lastName',
      ".firstName-label": 'firstName',
      '.lastName-label': 'lastName',
    };
  }

  onRender() {
    console.log('done rendering', this.el);
  }

  onShow() {
    console.log('el placed in dom', this.el);
  }

  onClickButton() {
    alert('clicked.');
  }
}


class MyRegion extends Region {
  constructor() {
    this.container = "#main";
  }
}


var myRegion = new MyRegion();

var myModel = new MyModel({
  firstName: "Gob",
  lastName: "Bluth",
});

var myView = new MyView({
  model: myModel
});

myRegion.show(myView);
