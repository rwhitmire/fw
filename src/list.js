(function() {
  "use strict";

  class List {
    constructor(models) {

      this.model = this.model || Model;
      this.models = [];

      for(let obj of models) {
        this.models.push(new this.model(obj));
      }

    }
  }

  window.List = List;

}());