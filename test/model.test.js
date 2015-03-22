describe("Model", () => {

  class TestModel extends Lib.Model {

  }

  describe("constructor", () => {
    it("should set properties", () => {
      var model = new TestModel({
        foo: 'bar'
      });

      expect(model.get('foo')).toBe('bar');
    });
  });

  describe("set", () => {
    it("should set the property value", () => {
      var model = new TestModel();
      model.set('foo', 'bar');
      expect(model.properties.foo).toBe('bar');
    });

    it("should trigger model change event", () => {
      var triggered = false;
      var model = new TestModel();

      model.on('change', () => {
        triggered = true;
      });

      model.set('foo', 'bar');

      expect(triggered).toBe(true);
    });

    it("should trigger property change event", () => {
      var triggered = false;
      var model = new TestModel();

      model.on('change:foo', () => {
        triggered = true;
      });

      model.set('foo', 'bar');

      expect(triggered).toBe(true);
    });
  });

  describe("get", () => {
    it("should get the property value", () => {
      var model = new TestModel();
      model.set('foo', 'bar');
      expect(model.get('foo')).toBe('bar');
    });
  });

  describe("toJSON", () => {
    it("should convert properties to json", () => {
      var model = new TestModel({foo: "bar"});
      var json = model.toJSON();
      expect(JSON.parse(json).foo).toBe('bar');
    });
  });
});