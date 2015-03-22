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
