qx.Class.define("fsm.control.Controller", {
  extend: qx.core.Object,

  properties: {
    view: {
      nullable: true,
      check: "qx.ui.core.Widget",
      apply: "_applyView"
    },

    device: {
      nullable: true,
      check: "fsm.light.Device"
    }
  },

  construct(device, view) {
    if (device) {
      this.setDevice(device);
    }

    if (view) {
      this.setView(view);
    }
  },

  members: {
    powerOnDevice() {
      this.getDevice()?.powerOn();
    },

    powerOffDevice() {
      this.getDevice()?.powerOff();
    },

    turnGreen(status = true) {
      this.getDevice()?.turnGreenOn(status);
    },

    turnYellow() {
      this.getDevice()?.turnYellow();
    },

    turnRed() {
      this.getDevice()?.turnRed();
    },

    _applyView(val) {
      val.setController(this);
    }
  }
});
