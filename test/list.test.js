describe("List", () => {

  class TestList extends List {

  }

  describe("constructor", () => {
    it("should initialize a list of models", () => {
      var list = new TestList([{foo: 'bar'}]);
      expect(list.models[0].get('foo')).toBe('bar');
    });

    it("should initialize a list of specified models", () => {
      class FooModel extends Model {
        customMethod() {
          return this.get('foo');
        }
      }

      class FooList extends List {
        constructor(models) {
          this.model = FooModel;
          super(models);
        }
      }

      var list = new FooList([{foo: 'bar'}]);
      expect(list.models[0].customMethod()).toBe('bar');
    });
  });
});