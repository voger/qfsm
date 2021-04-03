qx.Class.define("fsm.light.Bulb", {
  extend: qx.ui.core.Widget,

  properties: {
    bulbColor: {
      nullable: true,
      themeable: true,
      init: null,
      // check: "Color",
      apply: "_applyBulbColor"
    },

    illumination: {
      nullable: false,
      init: false,
      check: "Boolean",
      apply: "_applyIllumination"
    }
  },

  /**
   * Constructs a new light bulb.
   *
   * @param color {String} The light bulb color. Possible values are `red`, `yellow`, `green` and `dark`
   */
  construct(color) {
    this.base(arguments);
    this.setAllowStretchX(false);
    this.setAllowStretchY(false);

    this.__addReflection();
    // enforce _apply
    this.initIllumination();
  },

  members: {
    /**
     *  Turn on the bulb.
     *
     */
    switchOn() {
      this.setIllumination(true);
    },

    /**
     * Turn off the bulb.
     *
     */
    switchOff() {
      this.setIllumination(false);
    },

    _applyIllumination(val) {
      if (val) {
        this.addState("illuminated");
      } else {
        this.removeState("illuminated");
      }
    },

    _applyBulbColor(val) {
      this.setBackgroundColor(val);
    },

    // creates a widget that will be styled as reflection
    __addReflection() {
      const reflection = new qx.ui.core.Widget();
      reflection.setAppearance("bulb-reflection");
      reflection.setAllowStretchX(false);
      reflection.setAllowStretchY(false);

      this._setLayout(new qx.ui.layout.Canvas());
      this._add(reflection, {edge: 0});
    }
  }
});
