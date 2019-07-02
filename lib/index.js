'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = fetch;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Makes axios call
 * @param {params} object
 *
*/
_axios["default"].interceptors.request.use(function (config) {
  config.metadata = {
    startTime: Date.now()
  };
  return config;
}, function (error) {
  return Promise.reject(error);
}); // post request


_axios["default"].interceptors.response.use(function (response) {
  response.config.metadata.endTime = Date.now();
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
  return response;
}, function (error) {
  return Promise.reject(error);
});

function fetch(_x) {
  return _fetch.apply(this, arguments);
}

function _fetch() {
  _fetch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(params) {
    var data, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios["default"].request(params);

          case 3:
            data = _context.sent;
            _context.next = 6;
            return data.data;

          case 6:
            response = _context.sent;
            console.log("response time ".concat(data.duration));
            console.log(response);
            _context.next = 18;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            _context.t1 = console;
            _context.next = 16;
            return _context.t0;

          case 16:
            _context.t2 = _context.sent;

            _context.t1.log.call(_context.t1, _context.t2);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));
  return _fetch.apply(this, arguments);
}