describe("ListView", () => {

  class TestList extends Lib.List {

  }

  class TestModelView extends Lib.ModelView {

    constructor() {

    }

  }

  class TestListView extends Lib.ListView {
    constructor() {

    }
  }

  xdescribe("render", () => {
    it("should assign el", () => {
      var list = new TestList([{foo: "bar"}]);

      var listView = new TestListView({
        modelView: TestModelView,
        list: list
      });

      listView.render();
      expect(listView.el).not.toBeUndefined();
    });
  });
});