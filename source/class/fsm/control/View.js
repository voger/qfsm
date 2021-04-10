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

    this.__buttons = new Map();

    if (controller) {
      this.setController(controller);
    }

    this._setLayout(new qx.ui.layout.VBox());

    this._add(this.__buttonsPanel(), {flex: 0});
    this._add(this.__logger(), {flex: 1});
  },

  members: {
    __buttons: null,

    turnOn(evt) {
      if (evt.getData()) {
        this.getController()?.powerOnDevice();
      }
    },

    turnOff(evt) {
      if (evt.getData()) {
        this.getController()?.powerOffDevice();
      }
    },

    turnGreen(evt) {
      const val = evt.getData();
      val && this.getController()?.turnGreen(val);
    },

    turnYellow(evt) {
      const val = evt.getData();
      val && this.getController()?.turnYellow(val);
    },

    turnRed(evt) {
      const val = evt.getData();
      val && this.getController()?.turnRed(val);
    },

    _applyController(val) {
      val.setView(this);

      // prettier-ignore
      val.addListener( "changeState", function (evt) {
          const buttons = this.__buttons;
          const type = evt.getData();

          switch (type) {
            case fsm.control.Controller.STATE_OFF:
              buttons.get("offButton").setValue(true);
              buttons.get("redButton").setValue(false);
              buttons.get("yellowButton").setValue(false);
              buttons.get("greenButton").setValue(false);
              break;
            case fsm.control.Controller.STATE_ON:
              buttons.get("onButton").setValue(true);
              break;
            case fsm.control.Controller.STATE_RED:
              buttons.get("redButton").setValue(true);
              buttons.get("yellowButton").setValue(false);
              buttons.get("greenButton").setValue(false);
              break;
            case fsm.control.Controller.STATE_YELLOW:
              buttons.get("redButton").setValue(false);
              buttons.get("yellowButton").setValue(true);
              buttons.get("greenButton").setValue(false);
              break;
            case fsm.control.Controller.STATE_GREEN:
              buttons.get("redButton").setValue(false);
              buttons.get("yellowButton").setValue(false);
              buttons.get("greenButton").setValue(true);
              break;
          }
        }, this);
    },

    __buttonsPanel() {
      const container = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      const buttons = this.__buttons;

      const onButton = new qx.ui.form.ToggleButton(this.tr("Power On"));
      onButton.addListener("changeValue", this.turnOn, this);
      container.add(onButton);
      buttons.set("onButton", onButton);

      const offButton = new qx.ui.form.ToggleButton(this.tr("Power Off"));
      offButton.setValue(true);
      offButton.addListener("changeValue", this.turnOff, this);
      container.add(offButton);
      buttons.set("offButton", offButton);

      const powerGroup = new qx.ui.form.RadioGroup();

      powerGroup.add(onButton, offButton);

      const greenButton = new qx.ui.form.ToggleButton(this.tr("Turn Green"));
      greenButton.addListener("changeValue", this.turnGreen, this);
      container.add(greenButton);
      buttons.set("greenButton", greenButton);

      const yellowButton = new qx.ui.form.ToggleButton(this.tr("Turn Yellow"));
      yellowButton.addListener("changeValue", this.turnYellow, this);
      container.add(yellowButton);
      buttons.set("yellowButton", yellowButton);

      const redButton = new qx.ui.form.ToggleButton(this.tr("Turn Red"));
      redButton.addListener("changeValue", this.turnRed, this);
      container.add(redButton);
      buttons.set("redButton", redButton);

      const buttonsGroup = new qx.ui.form.RadioGroup().set({
        allowEmptySelection: true
      });
      buttonsGroup.add(greenButton, yellowButton, redButton);

      return container;
    },

    __logger() {
      const log = new qxl.logpane.LogPane();
      log.fetch();
      return log;
    }
  }
});
