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
    this._add(device, {top: "48%", left: "48%"});
  }
});