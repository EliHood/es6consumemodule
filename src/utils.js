const myModule = require('./index');

const utils = {};
const ACSSFM = {};

ACSSFM.sendErrorToServer = function (error) {
  if (typeof error === 'string') error = { error };
  else {
    const errorMsg = error.message;
    error = { error: errorMsg };
  }
  utils.sendErrorToServer(error);
};
ACSSFM.logErrorIntoServer = function (
  isFatalException,
  fileName,
  lineNum,
  errorData,
  callStack,
) {
  const reqInfo = {
    isFatalException,
    fileName,
    lineNum,
    errorData,
    callStack,
  };
  utils.sendErrorToServer(reqInfo);
};
ACSSFM.sendInfoToServer = function (info) {
  utils.sendInfoToServer(info);
};

ACSSFM.sendDebugToServer = function (debug) {
  let LOG_ENABLED;
  if (
    typeof LOG_ENABLED !== 'undefined'
    && LOG_ENABLED != null
    && LOG_ENABLED === 'Y'
  ) {
    utils.sendDebugToServer(debug);
  }
};

const URL = {};
if (typeof (window) !== 'undefined') {
  URL.RootUrl = `${window.location.protocol}//${window.location.host}`;
  URL.BaseWebUrl = '/ccare/web';
  URL.RootAppUrl = `/${window.location.pathname.split('/')[1]}`;
  URL.BaseAppUrl = `${URL.RootAppUrl
  }/${
    window.location.pathname.split('/')[2]
  }/${
    window.location.pathname.split('/')[3]}`;
  URL.RouterBaseAppUrl = `/router/${
    window.location.pathname.split('/')[2]
  }/${
    window.location.pathname.split('/')[3]}`;
  URL.ServiceUrl = `${URL.BaseAppUrl}/service/process`;
  URL.ServiceExportUrl = `${URL.BaseAppUrl}/service/export`;
  URL.HybridUrl = `${URL.BaseAppUrl}/hybrid/process`;
  URL.SoloCustUrl = `${URL.BaseAppUrl}/link/view`;
  URL.ExportUrl = `${URL.BaseAppUrl}/Export/process`;
  URL.FileUploadUrl = `${URL.BaseAppUrl}/service/processFile/encodefile`;
  URL.CSVExportUrl = `${URL.BaseAppUrl}/CSVExport/process`;
  URL.StreamUrl = `${URL.BaseAppUrl}/service/processStreamResponse`;
  URL.HomeUrl = `${URL.BaseAppUrl}/home/welcome`;
  URL.FileImportUrl = `${URL.BaseAppUrl}/service/importFile/encodefile`; // For import URL
  URL.POSLAUNCHURL = `${URL.BaseAppUrl}/home/posPortalLaunch`;
  URL.AllMdnExportUrl = `${URL.BaseAppUrl}/service/exportAllMdn`;
  URL.ParentNodeLevelExportUrl = `${URL.BaseAppUrl}/service/exportAllMdnForParemtNodeLevel`;
  URL.BulkNsoExportUrl = `${URL.BaseAppUrl}/service/bulkNsoExportUrl`;
  URL.exportE911ServiceAddress = `${URL.BaseAppUrl}/service/exportE911ServiceAddress`;
  URL.JnlpUrl = `${URL.BaseAppUrl}/home/loadJnlp`;
  URL.StateUrl = `${URL.BaseAppUrl}/home/stateprovider`; // Added by Dharm for Mapping State Provider
  // URL.ContextRoot = contextRoot;
  URL.LogUrl = `${URL.BaseAppUrl}/log`;
  // URL.versionNumber = versionNumberMeta;
  // URL.SsoInt = siteminderURL;
  URL.SUBMITTOACSSURL = `${URL.BaseAppUrl}/home/submitToAcss`;
  const ReqType = {};
  ReqType.GET = 'GET';
  ReqType.POST = 'POST';

  // hello
  utils.makeAjaxJSONCall = function (
    uri,
    type,
    jsonObject,
  ) {
    myModule
      .fetch({
        url: uri,
        type,
        startTime: Date.now(),
        data: JSON.stringify(jsonObject),
        dataType: 'json',
        contentType: 'application/json',
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(`error here ${err}`);
      });
  };

  utils.sendErrorToServer = function (error) {
    console.log(`snd error${error}`);
    utils.makeAjaxJSONCall(
      `${URL.LogUrl}/error`,
      ReqType.POST,
      error,
      () => {
        /* No Need to do anything */
      },
      null,
      null,
    );
  };


  utils.sendInfoToServer = function (info) {
    const jsonObj = { info };
    utils.makeAjaxJSONCall(
      `${URL.LogUrl}/info`,
      ReqType.POST,
      jsonObj,
      () => {
        /* No Need to do anything */
      },
      null,
      null,
    );
  };

  utils.sendDebugToServer = function (debug) {
    const jsonObj = { debug };
    utils.makeAjaxJSONCall(
      `${URL.LogUrl}/debug`,
      ReqType.POST,
      jsonObj,
      () => {
        /* No Need to do anything */
      },
      null,
      null,
    );
  };
}


module.exports = {
  utils,
  ACSSFM,
  URL,
};
