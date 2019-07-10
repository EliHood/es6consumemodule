import axios from 'axios';
let logger = [];
axios.interceptors.request.use( (config) =>{
    config.metadata = {
        startTime: Date.now()
    }
    return config
}, (error) => {
    console.log(error);
    return Promise.reject(error)
})
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
function onError(){
    const data = {};
    return window.onerror = ( msg, url,lineNo,columnNo, error) => {
        let string = msg.toLowerCase();
        let substring = 'script error';
        if (string.indexOf(substring) > -1) {
            alert('Script Error: See Browser Console for Detail');
        } 
        else {
            const messageObj = {
                Message: msg,
                URL: url,
                Line: lineNo,
                Column: columnNo,
                ErrorObject: JSON.stringify(error),
                Browser: getCurrentBrowser()
            };
            const messObj = JSON.stringify(messageObj)
            
            console.log(messObj);
            // ourLogger.log('info',messObj);
            // console.log(messageObj);
            return messObj;
        }
   };
}
function getCurrentBrowser(){
    const currentBrowser = navigator.appName.toString();
    return currentBrowser
}

function sendErrorToServer(errMsg){
/
}

export function onErrorMain(){
    let onErrorinit = onError();
    return onErrorinit;
}
function setClientid() {
    return Math.floor(Math.random() * 52029326) + 1
}
function setTransactionId(){
    return Math.floor(Math.random() * 340493046) + 1
}
