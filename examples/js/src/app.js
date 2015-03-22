(function() {
  "use strict";

  class MyModel extends Lib.Model {
    constructor(properties) {
      this.properties = properties;
    }
  }


  class MyView extends Lib.ModelView {
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


  class MyRegion extends Lib.Region {
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


  class EmployeeListRegion extends Lib.Region {
    get container() {
      return "#employee-list";
    }
  }

  class EmployeeList extends Lib.List {

  }

  class EmployeeModelView extends Lib.ModelView {
    get template() {
      return Handlebars.compile("{{ firstName }} {{ lastName }}");
    }
  }

  class EmployeeListView extends Lib.ListView {
    get modelView() {
      return EmployeeModelView;
    }
  }

  var employeeList = new EmployeeList([
    {firstName: 'ryan', lastName: 'whitmire'},
    {firstName: 'bill', lastName: 'smith'},
  ]);

  var employeeListView = new EmployeeListView({
    list: employeeList
  });

  var employeeListRegion = new EmployeeListRegion();

  employeeListRegion.show(employeeListView);

  setTimeout(function() {
    employeeList.add({firstName: 'bill', lastName: 'walton'});
  }, 1000);

})();
