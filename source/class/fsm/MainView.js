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

    new fsm.control.Controller(device, view);

    const win = new qx.ui.window.Window(this.tr("Traffic Control Center")).set({
      allowClose: false,
      showClose: false,
      allowMaximize: false,
      showMaximize: false,
      allowMinimize: false,
      showMinimize: false,
      showStatusbar: true,
      width: 600,
      height: 400,
      layout: new qx.ui.layout.Grow()
    });

    win.add(view);

    win.moveTo(600, 200);
    win.open();
  }
});
