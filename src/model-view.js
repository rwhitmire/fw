(function(){
  "use strict";

  class ModelView extends View {
    constructor(props) {
      this.model = props.model || new Lib.Model();
    }

    render() {
      console.log('rendering', this.el);

      if(!this.template) throw "ModelView must define a template.";

      let templateStr = this.template(this.model.properties);

      // create the dom node
      let node = document.createElement(this.tagName || 'div');
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