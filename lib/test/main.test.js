"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var consume = _interopRequireWildcard(require("../index"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chaiAsPromised = _interopRequireDefault(require("chai-as-promised"));

// import request from 'request';
var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].use(_chaiAsPromised["default"]);

_chai["default"].should();

var assert = _chai["default"].assert;
describe('should test GET', function () {
  it('should test GET method',
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(done) {
      var object, ourData;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              object = {
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/posts/1' // expect(consume.fetch(object)).to.be.a('object');

              };
              ourData = consume.fetch(object);
              return _context.abrupt("return", assert.isFulfilled(ourData, "optional message"));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
});