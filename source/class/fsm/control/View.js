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

    this._add(this.__buttonsPanel());
    this._add(this.__logger());
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

    turnYellow(evt) {
      const val = evt.getData();
      this.getController()?.turnYellow(val);
    },

    turnRed(evt) {
      const val = evt.getData();
      this.getController()?.turnRed(val);
    },

    _applyController(val) {
      val.setView(this);
    },

    __buttonsPanel() {
      const container = new qx.ui.container.Composite(new qx.ui.layout.HBox());

      const onButton = new qx.ui.form.ToggleButton(this.tr("Power On"));
      onButton.addListener("changeValue", this.turnOn, this);
      container.add(onButton);

      const offButton = new qx.ui.form.ToggleButton(this.tr("Power Off"));
      offButton.addListener("changeValue", this.turnOff, this);
      container.add(offButton);

      const greenButton = new qx.ui.form.ToggleButton(this.tr("Turn Green"));
      greenButton.addListener("changeValue", this.turnGreen, this);
      container.add(greenButton);

      const yellowButton = new qx.ui.form.ToggleButton(this.tr("Turn Yellow"));
      yellowButton.addListener("changeValue", this.turnYellow, this);
      container.add(yellowButton);

      const redButton = new qx.ui.form.ToggleButton(this.tr("Turn Red"));
      redButton.addListener("changeValue", this.turnRed, this);
      container.add(redButton);

      return container;
    },

    __logger() {
      const log = new qxl.logpane.LogPane();
      log.fetch();
      return log;
    }
  }
});
