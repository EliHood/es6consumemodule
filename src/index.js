'use strict';
import axios from 'axios';
import log from 'log-to-file';

/**
 * Makes axios call
 * @param {params} object
 *
*/

let logger = []


axios.interceptors.request.use( (config) =>{
    config.metadata = {
        startTime: Date.now()
    }
    return config
}, (error) => {
    return Promise.reject(error)
})
// post request
axios.interceptors.response.use( (response) => {
    response.config.metadata.endTime = Date.now()
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    
    
    const time = {
        startTime: response.config.metadata.startTime,
        endTime: response.config.metadata.endTime,
        duration: response.duration,
        url: response.config.url,
        method: response.config.method
    }
    if(logger.length > 80){
        logger = [];
    }
    else {
        logger.push(time);
    }
    
    console.log(logger);
    return response;
}, (error) => {
    return Promise.reject(error);
})
export async function fetch(params){
    const data = await axios(params);
    return data.data;
}


export function  millSecondMinutes(time){
    var minutes = Math.floor(time / 60000);
    var seconds = ((time % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}