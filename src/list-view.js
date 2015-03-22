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