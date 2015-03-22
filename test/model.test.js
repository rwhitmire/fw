describe("Model", () => {

  class TestModel extends Model {

  }

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

});