(function(){
  "use strict";

  class Model {
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

    toJSON() {
      return JSON.stringify(this.properties);
    }
  }

  Lib.Model = Model;

})();
