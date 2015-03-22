describe("ListView", () => {

  class TestList extends Lib.List {

  }

  class TestModelView extends Lib.ModelView {
    get template() {
      return function(){"<div></div>";};
    }
  }

  class TestListView extends Lib.ListView {
    constructor(props) {
      super(props);
      this.modelView = TestModelView;
    }
  }

  describe("render", () => {
    it("should assign el", () => {
      var list = new TestList([{foo: "bar"}, {foo: "baz"}]);

      var listView = new TestListView({
        modelView: TestModelView,
        list: list
      });

      listView.render();
      expect(listView.el.children.length).toBe(2);
    });
  });
});