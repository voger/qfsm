qx.Class.define("fsm.control.View", {
  extend: qx.ui.core.Widget,

  properties: {
    controller: {
      nullable: true,
      apply: "_applyController"
    }
  },

  construct(controller) {
    this.base(arguments);

    if (controller) {
      this.setController(controller);
    }

    this._setLayout(new qx.ui.layout.VBox());

    const onButton = new qx.ui.form.ToggleButton(this.tr("Power On"));
    onButton.addListener("changeValue", this.turnOn, this);
    this._add(onButton);

    const offButton = new qx.ui.form.ToggleButton(this.tr("Power Off"));
    offButton.addListener("changeValue", this.turnOff, this);
    this._add(offButton);

    const greenButton = new qx.ui.form.ToggleButton(this.tr("Turn Green"));
    greenButton.addListener("changeValue", this.turnGreen, this);
    this._add(greenButton);
  },

  members: {
    turnOn() {
      this.getController()?.turnOn();
    },

    turnOff() {
      this.getController()?.turnOff();
    },

    turnGreen(evt) {
      const val = evt.getData();
      this.getController()?.turnGreen(val);
    },

    _applyController(val) {
      val.setView(this);
    }
  }
});
