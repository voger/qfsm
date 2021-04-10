qx.Class.define("fsm.control.ToggleButton", {
  extend: qx.ui.form.ToggleButton,

  members: {
    _onExecute() {
      const value = this.getValue();
      if (value === false) {
        this.toggleValue();
      }
    }
  }
});
