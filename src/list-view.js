(function(){
  "use strict";

  class ListView extends Lib.View {
    constructor(props) {
      this.list = props.list;
    }

    render() {
      // let listNode = document.createElement(this.tagName || 'div');

      // for (let model of this.list.models){
      //   model.render();
      //   listNode.appendChild(model.el);
      // }

      // this.el = listNode;
    }
  }

  Lib.ListView = ListView;

}());