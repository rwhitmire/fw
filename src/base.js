(function(){
  "use strict";

  class Base {
    on(event, callback) {
      this._events = this._events || [];
      this._events.push({event, callback});
    }

    trigger(event) {
      this._events = this._events || [];

      var args = Array.prototype.slice.call(arguments);
      args.shift();

      for(let i = 0; i < this._events.length; i++) {
        let e = this._events[i];
        if(e.event == event) e.callback.apply(null, args);
      }
    }
  }

  Lib.Base = Base;

})();