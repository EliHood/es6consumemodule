import axios from 'axios';
import { utils } from './utils';

let logger = [];
// declare messageObj here for more flexiblity for rendering different error messages
let messageObj = {};

function setClientid() {
  return Math.floor(Math.random() * 52029326) + 1;
}
function setTransactionId() {
  return Math.floor(Math.random() * 340493046) + 1;
}

function getCurrentBrowser() {
  const currentBrowser = navigator.appName.toString();
  return currentBrowser;
}

axios.interceptors.request.use((config) => {
  config.metadata = {
    startTime: Date.now(),
  };
  return config;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});
axios.interceptors.response.use((response) => {
  response.config.metadata.endTime = Date.now();
  response.config.metadata.clientId = setClientid();
  response.config.metadata.transactionId = setTransactionId();
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
  const newDur = response.duration.toString();
  const newTime = `${newDur} mills`;
  console.log(newTime);
  response.config.metadata.finalTime = newTime;
  const statusData = {
    startTime: response.config.metadata.startTime,
    endTime: response.config.metadata.endTime,
    duration: response.config.metadata.finalTime,
    url: response.config.url,
    method: response.config.method,
    status: response.status,
    clientId: response.config.metadata.clientId,
    transactionId: response.config.metadata.transactionId,
  };
  console.log(statusData);
  if (logger.length > 80) {
    logger = [];
  } else {
    logger.push(statusData);
  }
  return response;
}, (error) => {
  logger.push(
    {
      status: error.response.status,
      statusText: error.response.statusText,
      url: error.config.url,
    },
  );
  return error;
});
// we only export this function, so the user can have access to this function
// only~
export async function fetch(params) {
  const data = await axios(params);
  const ourData = { data, logger };
  return ourData;
}
// on error function
function onError() {
  return window.onerror = (msg, url, lineNo, columnNo, error) => {
    const errMsg = msg.toLowerCase();
    const substring = 'script error';
    if (errMsg.indexOf(substring) > -1) {
        console.log('Script Error: See Browser Console for Detail');
    } else if (typeof PROD_ENV === 'string') {
      messageObj = {
        Message: msg,
        URL: url,
        Line: lineNo,
        Column: columnNo,
        ErrorObject: JSON.stringify(error),
        Browser: getCurrentBrowser(),
      };
      // trace stack here i guess.
    } else {
      messageObj = {
        Message: msg,
        URL: url,
        Line: lineNo,
        Column: columnNo,
        ErrorObject: JSON.stringify(error),
        Browser: getCurrentBrowser(),
      };
      const messObj = JSON.stringify(messageObj);
      // utils.sendErrorToServer(messObj);
      utils.sendErrorToServer(messObj);
      // sendErrorToServer(messObj)
      console.log(messObj);
      // ourLogger.log('info',messObj);
      // console.log(messageObj);
      // trace stack
      return messObj;
    }
  };
}
export function onErrorMain() {
  const onErrorinit = onError();
  return onErrorinit;
}
