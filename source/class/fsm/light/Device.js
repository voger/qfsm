qx.Class.define("fsm.light.Device", {
  extend: qx.ui.core.Widget,

  properties: {
    appearance: {
      refine: true,
      init: "trafic-light-device"
    },

    spacing: {
      check: "Integer",
      themeable: true,
      nullable: true,
      apply: "_applySpacing"
    }
  },

  construct() {
    this.base(arguments);

    this.setAllowStretchX(false);
    this.setAllowStretchY(false);

    const layout = new qx.ui.layout.VBox().set({
      alignX: "center",
      alignY: "middle"
    });

    this._setLayout(layout);
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
          this._addAt(control, 0);
          break;
        case "yellow-bulb":
          control = new fsm.light.Bulb();
          this._addAt(control, 1);
          break;
        case "green-bulb":
          control = new fsm.light.Bulb();
          this._addAt(control, 2);
      }

      return control || this.base(arguments, id);
    },

    turnGreenOn(status = true) {
      const bulb = this.getChildControl("green-bulb");
      status ? bulb.switchOn() : bulb.switchOff();
    },

    turnYellowOn(status = true) {
      const bulb = this.getChildControl("yellow-bulb");
      status ? bulb.switchOn() : bulb.switchOff();
    },

    turnRedOn(status = true) {
      const bulb = this.getChildControl("red-bulb");
      status ? bulb.switchOn() : bulb.switchOff();
    },

    _applySpacing(value) {
      var layout = this._getLayout();
      value == null ? layout.resetSpacing() : layout.setSpacing(value);
    }
  }
});
