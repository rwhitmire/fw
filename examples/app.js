(function() {
  "use strict";

  class MyModel extends Model {
    constructor(properties) {
      this.properties = properties;
    }
  }


  class MyView extends ModelView {
    constructor(params) {
      this.model = params.model;
      this.template = Handlebars.compile(document.getElementById('my-template').innerHTML);
      this.tagName = 'p';

      this.events = {
        'click button': this.onClickButton,
      };

      this.bindings = {
        "[name=firstName]": 'firstName',
        "[name=lastName]": 'lastName',
        ".firstName-label": 'firstName',
        '.lastName-label': 'lastName',
      };
    }

    onRender() {
      console.log('done rendering', this.el);
    }

    onShow() {
      console.log('el placed in dom', this.el);
    }

    onClickButton() {
      alert('clicked.');
    }
  }


  class MyRegion extends Region {
    constructor() {
      this.container = "#main";
    }
  }


  var myRegion = new MyRegion();

  var myModel = new MyModel({
    firstName: "Gob",
    lastName: "Bluth",
  });

  var myView = new MyView({
    model: myModel
  });

  myRegion.show(myView);

})();
