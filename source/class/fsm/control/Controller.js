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

    turnGreen(status = false) {
      this.getDevice()?.turnGreenOn(status);
    },

    turnYellow(status = false) {
      this.getDevice()?.turnYellowOn(status);
    },

    turnRed(status = false) {
      this.getDevice()?.turnRedOn(status);
    },

    _applyView(val) {
      val.setController(this);
    }
  }
});
