qx.Classs.define("fsm.controller.Controller", {
  extend: qx.core.Object,

  properties: {
    view: {
      nullable: true,
      check: "Widget",
      apply: "_applyView"
    },

    device: {
      nullable: true,
      check: "fsm.light.Device"
    }
  },

  construct(device, view) {
    this.setDevice(device);
    this.setView(view);

    this.__viewListeners = [];
  },

  members: {
    // keep references of listeners
    // attached to views for later removal
    // if needed
    __viewListeners: null,

    _applyView(val, old) {
      const listeners = this.__viewListeners;

      // first cleanup the old view
      if (old !== null) {
        listeners.forEach(function (listenerId) {
          old.removeListenerById(listenerId);
        }, this);
        qx.lang.Array.removeAll(listeners);
      }

      // then add listeners to the new view
      // save listeners resferences in case we want to remove
      // them later
      let reference;
      reference = val.addListener("powerOn", /* handle device power on */, this);
      listeners.push(reference);
      reference = val.addListener("powerOff", /* handle device power off */, this);
      listeners.push(reference);
      reference = val.addListener("turnGreen", /* hande device turn green */, this);
      listeners.push(reference);
      reference = val.addListener("turnRed", /* handle device turn red */, this);
      listeners.push(reference);
    }
  }
});
