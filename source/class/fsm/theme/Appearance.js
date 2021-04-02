/* ************************************************************************

   Copyright: 2021 

   License: MIT license

   Authors: voger

************************************************************************ */

qx.Theme.define("fsm.theme.Appearance", {
  extend: qx.theme.modern.Appearance,

  appearances: {
    "main-view": {
      include: "widget",

      style() {
        return {
          backgroundColor: "background"
        };
      }
    },

    "trafic-light-device": {
      include: "widget",

      style() {
        return {
          backgroundColor: "device",
          padding: [15, 0],
          width: 75,
          height: 200,
          decorator: "device"
        };
      }
    },

    "trafic-light-device/red-bulb": {
      style(states) {
        return {
          bulbColor: states.illuminated ? "red-bulb" : "dark-bulb"
        };
      }
    },

    "trafic-light-device/yellow-bulb": {
      style(states) {
        return {
          bulbColor: states.illuminated ? "yellow-bulb" : "dark-bulb"
        };
      }
    },

    "trafic-light-device/green-bulb": {
      alias: "widget",
      style(states) {
        const bulbColor = states.illuminated ? "green-bulb" : "dark-bulb";

        return {
          bulbColor: bulbColor,
        };
      }
    }
  }
});
