'use strict';
import axios from 'axios';
import log4js from 'log4js';
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
// logger.trace() logs data to the file. 


const logtoFile = log4js.getLogger();
log4js.configure({
    appenders: { log: { type: 'file',  filename: 'logtofile.json'} },
    categories: { default: { appenders: ['log'], level: 'ALL' } }
});
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
    const statusData = {
        startTime: response.config.metadata.startTime,
        endTime: response.config.metadata.endTime,
        duration: millSecondMinutes(response.duration),
        url: response.config.url,
        method: response.config.method,
        status: response.status,
        clientId:  response.config.metadata.clientId,
        transactionId: response.config.metadata.transactionId
    }   
     // logger trace writes statusData{object} to the logtofile.json
    logtoFile.trace(statusData);
    console.log(`look${statusData}`)
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
    logtoFile.trace(error);
    return error;
})
// we only export this function, so the user can have access to this function
// only~
export async function fetch(params){
    const data = await axios(params);   
    const ourData ={data, logger}
    return ourData;
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