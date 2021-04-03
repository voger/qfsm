/* ************************************************************************

   Copyright: 2021 

   License: MIT license

   Authors: voger

************************************************************************ */

qx.Theme.define("fsm.theme.Color", {
  extend: qx.theme.modern.Color,

  colors: {
    "background"      : "#1abc9c",
    "device"          : "#2c3e50",
    "red-bulb"        : "#c0392b",
    "yellow-bulb"     : "#f1c40f",
    "green-bulb"      : "#2ecc71",
    "dark-bulb"       : "#1f2b38",
    "bulb-reflection" : qx.core.Environment.get("css.rgba") ? "rgba(255, 255, 255, 0.6)" : "#FFFFFF"
  }
});
