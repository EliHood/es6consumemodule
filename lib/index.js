'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = fetch;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

/**
 * Makes axios call
 * @param {params} object
 *
*/
var logger = []; //  handles passing the logs in the jsonrequests.log file 

_axios["default"].interceptors.request.use(function (config) {
  config.metadata = {
    startTime: Date.now()
  };
  return config;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
}); // post request
// doesn't run when error 


_axios["default"].interceptors.response.use(function (response) {
  response.config.metadata.endTime = Date.now();
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
  var statusData = {
    startTime: response.config.metadata.startTime,
    endTime: response.config.metadata.endTime,
    duration: millSecondMinutes(response.duration),
    url: response.config.url,
    method: response.config.method,
    status: response.status
  };

  if (logger.length > 80) {
    logger = [];
  } else {
    logger.push(statusData);
  }

  console.log(logger);
  return response;
}, function (error) {
  logger.push({
    "status": error.response.status,
    "statusText": error.response.statusText,
    "url": error.config.url
  });
  console.log(logger);
  return error;
}); // we only export this function, so the user can have access to this function
// only~


function fetch(_x) {
  return _fetch.apply(this, arguments);
}

function _fetch() {
  _fetch = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(params) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _axios["default"])(params);

          case 2:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetch.apply(this, arguments);
}

function millSecondMinutes(time) {
  var minutes = Math.floor(time / 60000);
  var seconds = (time % 60000 / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + time;
}