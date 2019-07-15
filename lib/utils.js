"use strict";

var myModule = require('./index');

var utils = {};
var ACSSFM = {};

ACSSFM.sendErrorToServer = function (error) {
  if (typeof error === 'string') error = {
    error: error
  };else {
    var errorMsg = error.message;
    error = {
      error: errorMsg
    };
  }
  utils.sendErrorToServer(error);
};

ACSSFM.logErrorIntoServer = function (isFatalException, fileName, lineNum, errorData, callStack) {
  var reqInfo = {
    isFatalException: isFatalException,
    fileName: fileName,
    lineNum: lineNum,
    errorData: errorData,
    callStack: callStack
  };
  utils.sendErrorToServer(reqInfo);
};

ACSSFM.sendInfoToServer = function (info) {
  utils.sendInfoToServer(info);
};

ACSSFM.sendDebugToServer = function (debug) {
  var LOG_ENABLED;

  if (typeof LOG_ENABLED !== 'undefined' && LOG_ENABLED != null && LOG_ENABLED === 'Y') {
    utils.sendDebugToServer(debug);
  }
};

var URL = {};

if (typeof window !== 'undefined') {
  URL.RootUrl = "".concat(window.location.protocol, "//").concat(window.location.host);
  URL.BaseWebUrl = '/ccare/web';
  URL.RootAppUrl = "/".concat(window.location.pathname.split('/')[1]);
  URL.BaseAppUrl = "".concat(URL.RootAppUrl, "/").concat(window.location.pathname.split('/')[2], "/").concat(window.location.pathname.split('/')[3]);
  URL.RouterBaseAppUrl = "/router/".concat(window.location.pathname.split('/')[2], "/").concat(window.location.pathname.split('/')[3]);
  URL.ServiceUrl = "".concat(URL.BaseAppUrl, "/service/process");
  URL.ServiceExportUrl = "".concat(URL.BaseAppUrl, "/service/export");
  URL.HybridUrl = "".concat(URL.BaseAppUrl, "/hybrid/process");
  URL.SoloCustUrl = "".concat(URL.BaseAppUrl, "/link/view");
  URL.ExportUrl = "".concat(URL.BaseAppUrl, "/Export/process");
  URL.FileUploadUrl = "".concat(URL.BaseAppUrl, "/service/processFile/encodefile");
  URL.CSVExportUrl = "".concat(URL.BaseAppUrl, "/CSVExport/process");
  URL.StreamUrl = "".concat(URL.BaseAppUrl, "/service/processStreamResponse");
  URL.HomeUrl = "".concat(URL.BaseAppUrl, "/home/welcome");
  URL.FileImportUrl = "".concat(URL.BaseAppUrl, "/service/importFile/encodefile"); // For import URL

  URL.POSLAUNCHURL = "".concat(URL.BaseAppUrl, "/home/posPortalLaunch");
  URL.AllMdnExportUrl = "".concat(URL.BaseAppUrl, "/service/exportAllMdn");
  URL.ParentNodeLevelExportUrl = "".concat(URL.BaseAppUrl, "/service/exportAllMdnForParemtNodeLevel");
  URL.BulkNsoExportUrl = "".concat(URL.BaseAppUrl, "/service/bulkNsoExportUrl");
  URL.exportE911ServiceAddress = "".concat(URL.BaseAppUrl, "/service/exportE911ServiceAddress");
  URL.JnlpUrl = "".concat(URL.BaseAppUrl, "/home/loadJnlp");
  URL.StateUrl = "".concat(URL.BaseAppUrl, "/home/stateprovider"); // Added by Dharm for Mapping State Provider
  // URL.ContextRoot = contextRoot;

  URL.LogUrl = "".concat(URL.BaseAppUrl, "/log"); // URL.versionNumber = versionNumberMeta;
  // URL.SsoInt = siteminderURL;

  URL.SUBMITTOACSSURL = "".concat(URL.BaseAppUrl, "/home/submitToAcss");
  var ReqType = {};
  ReqType.GET = 'GET';
  ReqType.POST = 'POST'; // hello

  utils.makeAjaxJSONCall = function (uri, type, jsonObject) {
    myModule.fetch({
      url: uri,
      type: type,
      startTime: Date.now(),
      data: JSON.stringify(jsonObject),
      dataType: 'json',
      contentType: 'application/json'
    }).then(function (res) {
      console.log(res.data);
    })["catch"](function (err) {
      console.log("error here ".concat(err));
    });
  };

  utils.sendErrorToServer = function (error) {
    console.log("snd error".concat(error));
    utils.makeAjaxJSONCall("".concat(URL.LogUrl, "/error"), ReqType.POST, error, function () {
      /* No Need to do anything */
    }, null, null);
  };

  utils.sendInfoToServer = function (info) {
    var jsonObj = {
      info: info
    };
    utils.makeAjaxJSONCall("".concat(URL.LogUrl, "/info"), ReqType.POST, jsonObj, function () {
      /* No Need to do anything */
    }, null, null);
  };

  utils.sendDebugToServer = function (debug) {
    var jsonObj = {
      debug: debug
    };
    utils.makeAjaxJSONCall("".concat(URL.LogUrl, "/debug"), ReqType.POST, jsonObj, function () {
      /* No Need to do anything */
    }, null, null);
  };
}

module.exports = {
  utils: utils,
  ACSSFM: ACSSFM,
  URL: URL
};