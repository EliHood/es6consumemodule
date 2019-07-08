'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = fetch;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _log4js = _interopRequireDefault(require("log4js"));

/**
 * Makes axios call
 * @param {params} object
 *
*/
var logger = []; // here we are using log4js, this is how we set it up.
// level ALL captures every and any request.
// the filename would be called logtofile.json, all of the calls would
// be written to the logtofile.json file
// logger.trace() logs data to the file. 

var logtoFile = _log4js["default"].getLogger();

_log4js["default"].configure({
  appenders: {
    log: {
      type: 'file',
      filename: 'logtofile.json'
    }
  },
  categories: {
    "default": {
      appenders: ['log'],
      level: 'ALL'
    }
  }
});

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
  response.config.metadata.clientId = setClientid();
  response.config.metadata.transactionId = setTransactionId();
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
  var statusData = {
    startTime: response.config.metadata.startTime,
    endTime: response.config.metadata.endTime,
    duration: millSecondMinutes(response.duration),
    url: response.config.url,
    method: response.config.method,
    status: response.status,
    clientId: response.config.metadata.clientId,
    transactionId: response.config.metadata.transactionId // logger trace writes statusData{object} to the logtofile.json

  };
  logtoFile.trace(statusData);
  console.log("look".concat(statusData));

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
  }); // also writes errors to logtofile.json

  logtoFile.trace(error);
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

function setClientid() {
  return Math.floor(Math.random() * 52029326) + 1;
}

function setTransactionId() {
  return Math.floor(Math.random() * 340493046) + 1;
}

function millSecondMinutes(time) {
  var minutes = Math.floor(time / 60000);
  var seconds = (time % 60000 / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + time;
}