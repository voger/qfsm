/* ************************************************************************

   Copyright: 2021 

   License: MIT license

   Authors: voger

************************************************************************ */

qx.Theme.define("fsm.theme.Decoration", {
  extend: qx.theme.modern.Decoration,

  decorations: {
    "device": {
      style: {
        radius: 50,
        shadowLength: 3,
        shadowBlurRadius: 5,
        shadowColor: "shadow",
        width: 2,
        color: "border-main"
      }
    },

    "dark-bulb": {
      style: {
        radius: 50000
      }
    },

    "green-bulb": {
      style: {
        radius: 50000,
        shadowLength: [0, 0],
        shadowBlurRadius: 20,
        shadowSpreadRadius: 5,
        shadowColor: "green-bulb"
      }
    },

    "yellow-bulb": {
      style: {
        radius: 50000,
        shadowLength: [0, 0],
        shadowBlurRadius: 20,
        shadowSpreadRadius: 5,
        shadowColor: "yellow-bulb"
      }
    },



    "red-bulb": {
      style: {
        radius: 50000,
        shadowLength: [0, 0],
        shadowBlurRadius: 20,
        shadowSpreadRadius: 5,
        shadowColor: "red-bulb"
      }
    },

  }
});
