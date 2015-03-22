(function(){
  "use strict";

  class Region {
    show(view) {
      view.render();
      let container = document.querySelector(this.container);

      container.innerHTML = "";
      container.appendChild(view.el);

      if(view.onShow) view.onShow();
    }
  }

  window.Region = Region;

})();
