(function(){
  "use strict";

  class Model {
    get(propName) {
      return this.properties[propName];
    }

    set(propName, value) {
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
  }

  window.Model = Model;

})();
