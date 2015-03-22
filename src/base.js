(function(){
  "use strict";

  class Base {
    on(event, callback) {
      this._events = this._events || [];
      this._events.push({event, callback});
    }

    trigger(event) {
      var args = Array.prototype.slice.call(arguments);
      args.shift();

      for(let e of this._events || []) {
        if(e.event == event) e.callback.apply(null, args);
      }
    }
  }

  Lib.Base = Base;

})();