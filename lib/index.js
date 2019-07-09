'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = fetch;
exports.onError = onError;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _path = _interopRequireDefault(require("path"));

// import log4js from 'log4js';
// import {winston, transports, format, createLogger} from 'winston';
// import * as fs from 'fs';
// const logDir = 'log';
// Create the log directory if it does not exist
// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir);
// }
// const filename = path.join(logDir, 'stuff.json');

/**
 * Makes axios call
 * @param {params} object
 *
*/
var logger = []; // here we are using log4js, this is how we set it up.
// level ALL captures every and any request.
// the filename would be called logtofile.json, all of the calls would
// be written to the logtofile.json file
// const ourLogger = createLogger({
//     level: 'info',
//     format: format.json(),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//       //
//       // - Write to all logs with level `info` and below to `combined.log` 
//       // - Write all logs error (and below) to `error.log`.
//       //
//       new transports.File({ filename })
//     ]
// });

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
    transactionId: response.config.metadata.transactionId // ourLogger.log('info', statusData);

  };

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
  // ourLogger.log('info',error);

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
  var data = {}; //  closure ??? 
  // this would be invoked on the client side , 
  // now where do we call this ? 

  window.onerror = function (msg, url, lineNo, columnNo, error) {
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
        ErrorObject: JSON.stringify(error)
      };
      var messObj = JSON.stringify(messageObj);
      console.log(messObj); //   ourLogger.log('info',messObj);

      alert(message);
      console.log(messageObj);
    }

    return false;
  };
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