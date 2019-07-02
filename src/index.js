'use strict';
import axios from 'axios';
import log from 'log-to-file';
/**
 * Makes axios call
 * @param {params} object
 *
*/
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
    return response;
}, (error) => {
    return Promise.reject(error);
})
export async function fetch(params){
    const data = await axios(params);
    return data;
}
