qx.Class.define("fsm.light.Device", {
  extend: qx.ui.core.Widget,

  properties: {
    appearance: {
      refine: true,
      init: "trafic-light-device"
    }
  },

  construct() {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.VBox());
    this._showChildControl("red-bulb");
    this._showChildControl("yellow-bulb");
    this._showChildControl("green-bulb");
  },

  members: {
    _createChildControlImpl(id) {
      let control;

      switch (id) {
        case "red-bulb":
          control = new fsm.light.Bulb();
          this._addAt(control, 0, {flex: 2});
          break;
        case "yellow-bulb":
          control = new fsm.light.Bulb();
          this._addAt(control, 1, {flex: 1});
          break;
        case "green-bulb":
          control = new fsm.light.Bulb();
          this._addAt(control, 2, {flex: 2});
      }

      return control || this.base(arguments, id);
    },

    turnGreenOn(status = true) {
      const bulb = this.getChildControl("green-bulb");
      status ? bulb.switchOn() : bulb.switchOff();
    }
  }
});
