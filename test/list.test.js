describe("List", () => {

  class TestList extends Lib.List {

  }

  describe("constructor", () => {
    it("should initialize a list of models", () => {
      var list = new TestList([{foo: 'bar'}]);
      expect(list.models[0].get('foo')).toBe('bar');
    });

    it("should initialize a list of specified models", () => {
      class FooModel extends Lib.Model {
        customMethod() {
          return this.get('foo');
        }
      }

      class FooList extends Lib.List {
        constructor(models) {
          this.model = FooModel;
          super(models);
        }
      }

      var list = new FooList([{foo: 'bar'}]);
      expect(list.models[0].customMethod()).toBe('bar');
    });
  });

  describe("add", () => {
    it("should add plain objects", function() {
      var list = new TestList();
      list.add({foo: 'bar'});
      expect(list.models[0].get('foo')).toBe('bar');
    });

    it("should add models", function() {
      var list = new TestList();
      var model = new Model({foo: 'bar'});
      list.add(model);
      expect(list.models[0].get('foo')).toBe('bar');
    });
  });
});