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
      init: false,
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

    // this.addListener("redraw", this.update, this);
    this.update();
  },

  members: {
    _applyIllumination(val) {
      val ? this.addState("illuminated") : this.removeState("illuminated");
      this.update();
    },

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
      context.arc(hCenter, vCenter, radius, 0, Math.PI * 2);
      context.fill();


      context.fillStyle = qx.theme.manager.Color.getInstance().resolve("bulb-reflection");
      context.beginPath();
      context.arc(hCenter , vCenter, radius - 8, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = bulbColor;
      debugger;
      context.globalCompositeOperation = "source-over";
      context.beginPath();
      context.arc(hCenter - 4, vCenter, radius - 8, 0, Math.PI * 2);
      context.fill();
    }
  }
});
