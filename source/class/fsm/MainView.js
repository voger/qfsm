qx.Class.define("fsm.MainView", {
  extend: qx.ui.core.Widget,

  properties: {
    appearance: {
      refine: true,
      init: "main-view"
    }
  },

  construct() {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.Canvas());

    const device = new fsm.light.Device();
    this._add(device, {top: "48%", left: "20%"});

    const view = new fsm.control.View();

    const controller = new fsm.control.Controller(device, view);
    this._add(view, {right: "60%"});
  }
});
