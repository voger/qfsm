qx.Class.define("fsm.control.Controller", {
  extend: qx.core.Object,
  include: [qx.core.MLogging],

  properties: {
    view: {
      nullable: true,
      check: "qx.ui.core.Widget",
      apply: "_applyView"
    },

    device: {
      nullable: true,
      check: "fsm.light.Device"
    }
  },

  // prettier-ignore
  statics: {
    STATE_OFF       : "OFF",
    STATE_ON        : "ON",
    STATE_SELF_TEST : "SELF_TEST",
    STATE_RED       : "RED",
    STATE_YELLOW    : "YELLOW",
    STATE_GREEN     : "GREEN"
  },

  events: {
    /**
     * Notify subscribers that a state
     * change has taken place. Data is
     * the one of the entries the static
     * values of this class.
     */
    "changeState": "qx.event.type.Data"
  },

  construct(device, view) {
    if (device) {
      this.setDevice(device);
    }

    if (view) {
      this.setView(view);
    }

    const fsm = (this.__fsm = new qx.util.fsm.FiniteStateMachine("TreaficLights"));

    const transitionToOff = this.__createTransitionToOff();
    const transitionToRed = this.__createTransitionToRed();
    const transitionToGreen = this.__createTransitionToGreen();
    const transitionToYellow = this.__createTransitionToYellow();

    const stateDeviceOff = this.__createStateDeviceOff();
    stateDeviceOff.addTransition(this.__createTransitionOffToOn());
    fsm.addState(stateDeviceOff);

    const stateDeviceOn = this.__createStateDeviceOn();
    stateDeviceOn.addTransition(transitionToOff);
    stateDeviceOn.addTransition(transitionToRed);
    fsm.addState(stateDeviceOn);

    const stateDeviceRed = this.__createStateDeviceRed();
    stateDeviceRed.addTransition(transitionToOff);
    stateDeviceRed.addTransition(transitionToYellow);
    stateDeviceRed.addTransition(transitionToGreen);
    fsm.addState(stateDeviceRed);

    const stateDeviceGreen = this.__createStateDeviceGreen();
    stateDeviceGreen.addTransition(transitionToRed);
    stateDeviceGreen.addTransition(transitionToYellow);
    stateDeviceGreen.addTransition(transitionToOff);
    stateDeviceGreen.addTransition(this.__createTransitionGreenToRedThroughYellow());
    fsm.addState(stateDeviceGreen);

    const stateDeviceYellow = this.__createStateDeviceYellow();
    stateDeviceYellow.addTransition(transitionToRed);
    stateDeviceYellow.addTransition(transitionToGreen);
    stateDeviceYellow.addTransition(transitionToOff);
    fsm.addState(stateDeviceYellow);

    fsm.addObject("controller", this);

    fsm.setDebugFlags(
      // qx.util.fsm.FiniteStateMachine.DebugFlags.EVENTS |
      //   qx.util.fsm.FiniteStateMachine.DebugFlags.TRANSITIONS |
      //   qx.util.fsm.FiniteStateMachine.DebugFlags.FUNCTION_DETAIL |
      qx.util.fsm.FiniteStateMachine.DebugFlags.OBJECT_NOT_FOUND
    );

    fsm.start();
  },

  members: {
    // a finite state machine to handle
    // transition to various states
    __fsm: null,

    __deviceStateOff: null,
    __deviceStateOn: null,

    /**
     * Power on the device.
     *
     */
    powerOnDevice() {
      this.__fsm.fireImmediateEvent(this.constructor.STATE_ON, this);
    },

    /**
     * Power off the device.
     *
     */
    powerOffDevice() {
      this.__fsm.fireImmediateEvent(this.constructor.STATE_OFF, this);
    },

    turnGreen() {
      this.__fsm.fireImmediateEvent(this.constructor.STATE_GREEN, this);
    },

    turnYellow() {
      this.__fsm.fireImmediateEvent(this.constructor.STATE_YELLOW, this);
    },

    turnRed() {
      this.__fsm.fireImmediateEvent(this.constructor.STATE_RED, this);
    },

    _applyView(val) {
      val.setController(this);
    },

    __createStateDeviceOff() {
      const _this = this;
      const stateInfo = {
        context: _this,
        onentry: this.powerOffDevice,
        events: {
          "ON": {
            "controller": "Off_to_On"
          }
        }
      };

      return new qx.util.fsm.State("Off", stateInfo);
    },

    __createStateDeviceOn() {
      const _this = this;
      const stateInfo = {
        context: _this,
        onentry: function (fsm) {
          const device = this.getDevice();

          device?.powerOn();
          device?.turnGreenOn();
          device?.turnYellowOn();
          device?.turnRedOn();

          this.fireDataEvent("changeState", this.constructor.STATE_ON);

          // prettier-ignore
          qx.event.Timer.once(function () {
            device?.turnGreenOff();
            device?.turnYellowOff();
            device?.turnRedOff();
            fsm.fireImmediateEvent(this.constructor.STATE_RED, this);
            }, this, 1000);
        },
        "events": {
          "OFF": {
            "controller": "to_Off"
          },

          "RED": {
            "controller": "to_Red"
          }
        }
      };

      return new qx.util.fsm.State("On", stateInfo);
    },

    __createStateDeviceRed() {
      const _this = this;
      const stateInfo = {
        context: _this,
        onentry: function () {
          const device = this.getDevice();
          device?.turnRedOn();

          this.fireDataEvent("changeState", this.constructor.STATE_RED);
        },
        onexit: function () {
          const device = this.getDevice();
          device?.turnRedOff();
        },

        "events": {
          "OFF": {
            "controller": "to_Off"
          },

          "GREEN": {
            "controller": "to_Green"
          },

          "YELLOW": {
            "controller": "to_Yellow"
          }
        }
      };

      return new qx.util.fsm.State("Red", stateInfo);
    },

    __createStateDeviceGreen() {
      const stateInfo = {
        onentry: () => {
          const device = this.getDevice();
          device?.turnGreenOn();
        },

        onexit: () => {
          const device = this.getDevice();
          device?.turnGreenOff();
        },

        "events": {
          "OFF": {
            "controller": "to_Off"
          },

          "RED": {
            "controller": "Green_to_Red_through_Yellow"
          },

          "YELLOW": {
            "controller": "to_Yellow"
          }
        }
      };

      return new qx.util.fsm.State("Green", stateInfo);
    },

    __createStateDeviceYellow() {
      const stateInfo = {
        onentry: () => {
          const device = this.getDevice();
          device?.turnYellowOn();
        },

        onexit: () => {
          this.getDevice()?.turnYellowOff();
        },

        "events": {
          "OFF": {
            "controller": "to_Off"
          },

          "RED": {
            "controller": "to_Red"
          },

          "GREEN": {
            "controller": "to_Green"
          }
        }
      };

      return new qx.util.fsm.State("Yellow", stateInfo);
    },

    __createTransitionOffToOn() {
      const transitionInfo = {
        nextState: "On",
        predicate: true,
        ontransition: () => {
          this.info("Changing device to On");
          this.fireDataEvent("changeState", this.constructor.STATE_ON);
        }
      };

      return new qx.util.fsm.Transition("Off_to_On", transitionInfo);
    },

    __createTransitionToOff() {
      const transitionInfo = {
        nextState: "Off",
        predicate: true,
        ontransition: () => {
          this.info("Changing device to Off");
          this.fireDataEvent("changeState", this.constructor.STATE_OFF);
        }
      };

      return new qx.util.fsm.Transition("to_Off", transitionInfo);
    },

    __createTransitionToRed() {
      const transitionInfo = {
        nextState: "Red",
        predicate: true,
        ontransition: () => {
          this.info("Changing device to Red");
          this.fireDataEvent("changeState", this.constructor.STATE_RED);
        }
      };

      return new qx.util.fsm.Transition("to_Red", transitionInfo);
    },

    __createTransitionToGreen() {
      const transitionInfo = {
        nextState: "Green",
        predicate: true,
        ontransition: () => {
          this.info("Changing device to Green");
          this.fireDataEvent("changeState", this.constructor.STATE_GREEN);
        }
      };

      return new qx.util.fsm.Transition("to_Green", transitionInfo);
    },

    __createTransitionToYellow() {
      const transitionInfo = {
        nextState: "Yellow",
        predicate: true,
        ontransition: () => {
          this.info("Changing device to Yellow");
          this.fireDataEvent("changeState", this.constructor.STATE_YELLOW);
        }
      };

      return new qx.util.fsm.Transition("to_Yellow", transitionInfo);
    },

    __createTransitionGreenToRedThroughYellow() {
      const transitionInfo = {
        context: this,
        nextState: "Yellow",
        predicate: (fsm, event) => {
          return event.getType() === this.constructor.STATE_RED;
        },

        ontransition: (fsm, event) => {
          const waitSeconds = 3;
          // rethrow the event to be picked by the Yellow state
          fsm.scheduleEvent(event.getType(), this, null, waitSeconds * 1000);
          this.info(`Changing device to Red through Yellow. Please wait ${waitSeconds} seconds.`);
          this.fireDataEvent("changeState", this.constructor.STATE_RED);
        }
      };

      return new qx.util.fsm.Transition("Green_to_Red_through_Yellow", transitionInfo);
    }
  }
});
