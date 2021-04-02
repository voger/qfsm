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
          width: 70,
          height: 200,
          spacing: 17,
          decorator: "device"
        };
      }
    },

    "bulb": {
      style() {
        return {
          width: 40,
          height: 40,
          decorator: "dark-bulb",
          margin: [15, 0]
        };
      }
    },

    "trafic-light-device/red-bulb": {
      alias: "bulb",
      include: "bulb",

      style(states) {
        return {
          bulbColor: states.illuminated ? "red-bulb" : "dark-bulb",
          decorator: states.illuminated ? "red-bulb" : "dark-bulb"
        };
      }
    },

    "trafic-light-device/yellow-bulb": {
      alias: "bulb",
      include: "bulb",

      style(states) {
        return {
          bulbColor: states.illuminated ? "yellow-bulb" : "dark-bulb",
          decorator: states.illuminated ? "yellow-bulb" : "dark-bulb"
        };
      }
    },

    "trafic-light-device/green-bulb": {
      alias: "bulb",
      include: "bulb",

      style(states) {
        return {
          bulbColor: states.illuminated ? "green-bulb" : "dark-bulb",
          decorator: states.illuminated ? "green-bulb" : "dark-bulb"
        };
      }
    }
  }
});
