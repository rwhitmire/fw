(function() {
  "use strict";

  class MyView extends Lib.ModelView {
    get template() {
      return Handlebars.compile(document.getElementById('my-template').innerHTML);
    }

    get tagName() {
      return "p";
    }

    get events() {
      return {
        'click button': this.onClickButton,
      };
    }

    get bindings() {
      return {
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
    get container() {
      return "#main";
    }
  }


  var myRegion = new MyRegion();

  var myModel = new Lib.Model({
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

  var employeeList = new Lib.List([
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
