"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = fetch;
exports.onErrorMain = onErrorMain;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var logger = [];

_axios["default"].interceptors.request.use(function (config) {
  config.metadata = {
    startTime: Date.now()
  };
  return config;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
});

_axios["default"].interceptors.response.use(function (response) {
  response.config.metadata.endTime = Date.now();
  response.config.metadata.clientId = setClientid();
  response.config.metadata.transactionId = setTransactionId();
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
  var newDur = response.duration.toString();
  var newTime = "".concat(newDur, " mills");
  console.log(newTime);
  response.config.metadata.finalTime = newTime;
  var statusData = {
    startTime: response.config.metadata.startTime,
    endTime: response.config.metadata.endTime,
    duration: response.config.metadata.finalTime,
    url: response.config.url,
    method: response.config.method,
    status: response.status,
    clientId: response.config.metadata.clientId,
    transactionId: response.config.metadata.transactionId
  };
  console.log(statusData);

  if (logger.length > 80) {
    logger = [];
  } else {
    logger.push(statusData);
  }

  return response;
}, function (error) {
  logger.push({
    "status": error.response.status,
    "statusText": error.response.statusText,
    "url": error.config.url
  });
  return error;
}); // we only export this function, so the user can have access to this function
// only~


function fetch(_x) {
  return _fetch.apply(this, arguments);
} // on error function 


function _fetch() {
  _fetch = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(params) {
    var data, ourData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _axios["default"])(params);

          case 2:
            data = _context.sent;
            ourData = {
              data: data,
              logger: logger
            };
            return _context.abrupt("return", ourData);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetch.apply(this, arguments);
}

function onError() {
  var data = {};
  return window.onerror = function (msg, url, lineNo, columnNo, error) {
    var string = msg.toLowerCase();
    var substring = 'script error';

    if (string.indexOf(substring) > -1) {
      alert('Script Error: See Browser Console for Detail');
    } else {
      var message = ['Message: ' + msg, 'URL: ' + url, 'Line: ' + lineNo, 'Column: ' + columnNo, 'Error object: ' + JSON.stringify(error)].join(' - ');
      var messageObj = {
        Message: msg,
        URL: url,
        Line: lineNo,
        Column: columnNo,
        ErrorObject: JSON.stringify(error),
        Browser: getCurrentBrowser()
      };
      var messObj = JSON.stringify(messageObj);
      console.log(messObj); // ourLogger.log('info',messObj);
      // console.log(messageObj);

      return messObj;
    }
  };
}

function getCurrentBrowser() {
  var currentBrowser = navigator.appName.toString();
  return currentBrowser;
}

function onErrorMain() {
  var onErrorinit = onError();
  return onErrorinit;
}

function setClientid() {
  return Math.floor(Math.random() * 52029326) + 1;
}

function setTransactionId() {
  return Math.floor(Math.random() * 340493046) + 1;
}