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
    it("should add plain objects", () => {
      var list = new TestList();
      list.add({foo: 'bar'});
      expect(list.models[0].get('foo')).toBe('bar');
    });

    it("should add models", () => {
      var list = new TestList();
      var model = new Model({foo: 'bar'});
      list.add(model);
      expect(list.models[0].get('foo')).toBe('bar');
    });

    it("should trigger add event", () => {
      var triggered = false;

      var list = new TestList();
      
      list.on('add', () => {
        triggered = true;
      });

      list.add({});

      expect(triggered).toBe(true);
    });

    it("should not add two models with the same id", () => {
      var list = new TestList();
      list.add({id: 1});
      list.add({id: 1});

      expect(list.models.length).toBe(1);
    });

    it("should not add two models with the same idProperty", () => {
      class FooList extends List {
        get idProperty() {
          return "foo";
        }
      }

      var list = new FooList();

      list.add({foo: 1});
      list.add({foo: 1});

      expect(list.models.length).toBe(1);
    });

    it("should add two models with falsy ids", () => {
      var list = new TestList();
      list.add({id: 0});
      list.add({id: 0});

      expect(list.models.length).toBe(2);
    });
  });

  describe("find", () => {
    it("should find the first matching model", () => {
      var list = new TestList([{id: 1}, {id: 2}]);
      var model = list.find(model => {
        return model.get('id') == 2;
      });

      expect(model.get('id')).toBe(2);
    });
  });
});