'use strict';
import axios from 'axios';
// import log4js from 'log4js';
// import {winston, transports, format, createLogger} from 'winston';
import path from 'path';
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
let logger = [];

// here we are using log4js, this is how we set it up.
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



axios.interceptors.request.use( (config) =>{
    
    config.metadata = {
        startTime: Date.now()
    }
    return config
}, (error) => {
    console.log(error);
    return Promise.reject(error)
})
// post request
// doesn't run when error 
axios.interceptors.response.use( (response) => {
    response.config.metadata.endTime = Date.now()
    response.config.metadata.clientId = setClientid();
    response.config.metadata.transactionId = setTransactionId();
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    const newDur = response.duration.toString()
    const newTime = `${newDur} mills`
    console.log(newTime);
    response.config.metadata.finalTime = newTime;
    const statusData = {
        startTime: response.config.metadata.startTime,
        endTime: response.config.metadata.endTime,
        duration:  response.config.metadata.finalTime,
        url: response.config.url,
        method: response.config.method,
        status: response.status,
        clientId:  response.config.metadata.clientId,
        transactionId: response.config.metadata.transactionId
    }   

    // ourLogger.log('info', statusData);
    console.log(statusData)
    if(logger.length > 80){
        logger = [];
    }
    else {
        logger.push(statusData);
    }
    return response;
}, (error) => {
    logger.push(
        {"status": error.response.status,
         "statusText": error.response.statusText,
         "url": error.config.url
        }
    );
    // also writes errors to logtofile.json
    // ourLogger.log('info',error);
    return error;
})
// we only export this function, so the user can have access to this function
// only~
export async function fetch(params){
    const data = await axios(params);   
    const ourData ={data, logger}
    return ourData;
}

// on error function 

export function onError(){
    const data = {};
//  closure ??? 
// this would be invoked on the client side , 
// now where do we call this ? 
 window.onerror = ( msg, url,lineNo,columnNo, error) => {
    let string = msg.toLowerCase();
    let substring = 'script error';
    if (string.indexOf(substring) > -1) {
      alert('Script Error: See Browser Console for Detail');
    } else {
      let message = [
        'Message: ' + msg,
        'URL: ' + url,
        'Line: ' + lineNo,
        'Column: ' + columnNo,
        'Error object: ' + JSON.stringify(error)
      ].join(' - ');
      const messageObj = {
        Message: msg,
        URL: url,
        Line: lineNo,
        Column: columnNo,
        ErrorObject: JSON.stringify(error)
      };
      const messObj = JSON.stringify(messageObj)
      console.log(messObj);

    //   ourLogger.log('info',messObj);
  
      alert(message);
      console.log(messageObj);
    }
    return false;
  };

}




function setClientid() {
    return Math.floor(Math.random() * 52029326) + 1
}
function setTransactionId(){
    return Math.floor(Math.random() * 340493046) + 1
}
function  millSecondMinutes(time){
    var minutes = Math.floor(time / 60000);
    var seconds = ((time % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + time ;
}