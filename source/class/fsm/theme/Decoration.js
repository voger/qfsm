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
    }
  }
});
