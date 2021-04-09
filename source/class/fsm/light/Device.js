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
    },

    status: {
      check: ["on", "off"],
      nullable: false,
      init: "off",
      apply: "_applyStatus"
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

    turnGreenOn() {
      if (this.isOn()) {
        this.getChildControl("green-bulb").switchOn();
      }
    },

    turnGreenOff() {
      this.getChildControl("green-bulb").switchOff();
    },

    turnYellowOn() {
      if (this.isOn()) {
        this.getChildControl("yellow-bulb").switchOn();
      }
    },

    turnYellowOff() {
      this.getChildControl("yellow-bulb").switchOff();
    },

    turnRedOn() {
      if (this.isOn()) {
        this.getChildControl("red-bulb").switchOn();
      }
    },

    turnRedOff() {
      this.getChildControl("red-bulb").switchOff();
    },

    isOn() {
      return this.getStatus() === "on";
    },

    isOff() {
      return this.getStatus() === "off";
    },

    powerOn() {
      this.setStatus("on");
    },

    powerOff() {
      this.setStatus("off");
    },

    _applySpacing(value) {
      var layout = this._getLayout();
      value == null ? layout.resetSpacing() : layout.setSpacing(value);
    },

    _applyStatus(val) {
      if (val === "off") {
        this.turnRedOff();
        this.turnYellowOff();
        this.turnGreenOff();
      }
    }
  }
});
