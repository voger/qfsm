qx.Class.define("fsm.light.Bulb", {
  extend: qx.ui.embed.Canvas,

  properties: {
    bulbColor: {
      nullable: true,
      themeable: true,
      check: "Color"
    },

    illumination: {
      nullable: false,
      init: true,
      check: "Boolean",
      apply: "_applyIllumination"
    },

    appearance: {
      refine: true,
      init: "dark-bulb"
    },

    syncDimension: {
      refine: true,
      init: true
    }
  },

  /**
   * Constructs a new light bulb.
   *
   * @param color {String} The light bulb color. Possible values are `red`, `yellow`, `green` and `dark`
   */
  construct(color) {
    this.base(arguments);

    if (color) {
      this.setBulbColor(color);
    }

    // enforce _apply
    this.initIllumination();

    // this.addListener("redraw", this.update, this);
    this.update();
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
      val ? this.addState("illuminated") : this.removeState("illuminated");
      this.update();
    },

    // override
    _draw(width, height, context) {
      // bulb center
      const hCenter = Math.round(width / 2);
      const vCenter = Math.round(height / 2);

      // calculate bulb radius
      const boundWidth = this.getBounds().width;
      const diameter = boundWidth - 30;
      const radius = Math.round(diameter / 2);

      const bulbColor = qx.theme.manager.Color.getInstance().resolve(this.getBulbColor());

      context.fillStyle = bulbColor;

      context.beginPath();

      if (this.getIllumination()) {
        context.shadowBlur = 20;
        context.shadowColor = bulbColor;
      } else {
        context.shadowBlur = 0;
      }

      context.arc(hCenter, vCenter, radius, 0, Math.PI * 2);
      context.fill();
      this.__drawReflection(hCenter, vCenter, radius, bulbColor, context);
    },

    __drawReflection(hCenter, vCenter, bulbRadius, bulbColor, context) {
      context.fillStyle = qx.theme.manager.Color.getInstance().resolve("bulb-reflection");
      context.beginPath();
      context.arc(hCenter, vCenter, bulbRadius - 8, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = bulbColor;
      context.globalCompositeOperation = "source-over";
      context.beginPath();
      context.arc(hCenter - 4, vCenter, bulbRadius - 8, 0, Math.PI * 2);
      context.fill();
    }
  }
});
