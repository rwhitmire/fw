(function() {
  "use strict";

  class List extends Base {
    constructor(models) {
      models = models || [];

      this.model = this.model || Model;
      this.models = [];

      for(let i = 0; i < models.length; i++) {
        this.add(models[i]);
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
      for(let i = 0; i < this.models.length; i++) {
        let model = this.models[i];
        if(expression(model)) return model;
      }
    }
  }

  function isModel(obj) {
    return !!obj.properties;
  }

  Lib.List = List;

}());