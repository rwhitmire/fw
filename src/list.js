(function() {
  "use strict";

  class List {
    constructor(models) {
      models = models || [];

      this.model = this.model || Model;
      this.models = [];

      for(let obj of models) {
        this.add(obj);
      }
    }

    add(obj) {
      var model;

      if(isModel(obj)) model = obj;
      else model = new this.model(obj);

      this.models.push(model);
    }
  }

  function isModel(obj) {
    return !!obj.properties;
  }

  Lib.List = List;

}());