"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2017/7/6 0006.
 */

function defineLogLevel(value, name) {
  return { value: value, name: name };
};

var MyLogger = function () {
  function MyLogger() {
    (0, _classCallCheck3.default)(this, MyLogger);

    //初始设置level
    this.level = MyLogger.DEBUG;
    //分模块的MAP
    this.logHash = new _map2.default();
    //设置模块
    this.logOwner = "main";
    //console http方式
    this.logOutput = ["console"];
    //设置过滤模块
    this.moduleFlag = [];
  }

  (0, _createClass3.default)(MyLogger, [{
    key: "setLevel",
    value: function setLevel(newLevel) {
      this.level = newLevel;
    }
  }, {
    key: "getLevelfunction",
    value: function getLevelfunction() {

      return this.level;
    }
  }, {
    key: "enabledFor",
    value: function enabledFor(lvl) {

      return lvl.value >= this.level.value;
    }
  }, {
    key: "debug",
    value: function debug(messgage) {
      this.invoke(MyLogger.DEBUG, messgage);
    }
  }, {
    key: "info",
    value: function info(messgage) {
      this.invoke(MyLogger.INFO, messgage);
    }
  }, {
    key: "warn",
    value: function warn(messgage) {
      this.invoke(MyLogger.WARN, messgage);
    }
  }, {
    key: "error",
    value: function error(messgage) {
      this.invoke(MyLogger.ERROR, messgage);
    }
  }, {
    key: "log",
    value: function log(messgage) {
      this.invoke(MyLogger.LOG, messgage);
    }
  }, {
    key: "invoke",
    value: function invoke(context, messages) {
      if (this.enabledFor(context)) {

        var hdlr = console.log;
        if (context === MyLogger.WARN && console.warn) {
          hdlr = console.warn;
        } else if (context === MyLogger.ERROR && console.error) {
          hdlr = console.error;
        } else if (context === MyLogger.INFO && console.info) {
          hdlr = console.info;
        } else if (context === MyLogger.DEBUG && console.debug) {
          hdlr = console.debug;
        } else if (context === MyLogger.LOG && console.debug) {
          hdlr = console.log;
        }

        this.invokeConsoleMethod(hdlr, messages);
      }
    }
  }, {
    key: "getMoudle",
    value: function getMoudle(type) {
      if (!this.logHash.has(type)) {
        var log = new MyLogger();
        log.logOwner = type;
        log.moduleFlag = this.moduleFlag;
        log.level = this.level;
        this.logHash.set(type, log);
      }
      return this.logHash.get(type);
    }
  }, {
    key: "invokeConsoleMethod",
    value: function invokeConsoleMethod(hdlr, messages) {

      if (this.logOutput.includes("console")) {
        if (this.logOwner != "main") {
          var flag = false;
          if (this.moduleFlag.length == 0) {
            flag = true;
          } else {
            if (this.moduleFlag.includes(this.logOwner)) {
              flag = true;
            }
          }
          if (flag) {
            var moduleStr = "[" + this.logOwner + "]";
            Function.prototype.apply.call(hdlr, console, [moduleStr, messages]);
          }
        } else {
          Function.prototype.apply.call(hdlr, console, [messages]);
        }
      }
      if (this.logOutput.includes("http")) {
        //这里写http方式
      }
    }
  }]);
  return MyLogger;
}();

exports.default = MyLogger;


MyLogger.DEBUG = defineLogLevel(1, 'DEBUG');
MyLogger.INFO = defineLogLevel(2, 'INFO');
MyLogger.LOG = defineLogLevel(3.5, 'LOG');
MyLogger.TIME = defineLogLevel(3, 'TIME');
MyLogger.WARN = defineLogLevel(4, 'WARN');
MyLogger.ERROR = defineLogLevel(8, 'ERROR');
MyLogger.OFF = defineLogLevel(99, 'OFF');