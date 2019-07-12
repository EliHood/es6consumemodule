import React, {Component} from 'react';
import './App.css';
import Logs from './Logs';
import axios from 'axios';
import * as consume from 'elifetchmodes6';
class Home extends Component {
    state = {
      logData: [],
      data:[],
      url: 'https://jsonplaceholder.typicode.com/posts', // only logs if the url end point is consistent with the service end point
      show: false
    };
    //  need a way to retrieve the logs from a db, that way when screen is rendered
    //  the logs will append to their respsected table values. 
    //  as of now, no logs are saved to anything. So we can't recieve anything on render. 
    // so were posting/appending items within array to data state
    componentDidMount(){

       consume.onErrorMain()
      

    }
    postData = e => {  
      e.preventDefault();
      // aopends last key within array to logtofile
     let keys = Object.keys(this.state.data);
      let last = keys[keys.length - 1];
      const realData = this.state.data[last];
      const postLogs = {
        method: 'POST',
        url: this.state.url,
        data:realData
      }
      consume.fetch(postLogs).then( res => {
        console.log(res.logger)
        this.setState({
          data: res.logger
        })
      })
     

      
    };
    getData = e => {
      e.preventDefault();
      const getLog = {
        method: "get",
        url:this.state.url + '/1',
      }
      consume.fetch(getLog).then( res => {
        this.setState({
          data: res.logger
        })
      })
    }
    updateData = e => {
      e.preventDefault();
      const updateData =  {
        method: 'put',
        url: this.state.url + '/1',
        data: this.state.data
      }
      consume.fetch(updateData).then( res => {
        this.setState({
          data: res.logger
        })
      })
    }
    deleteData = e => {
      e.preventDefault();
      const updateData =  {
        method: 'delete',
        url: this.state.url + '/1',
        data: this.state.data
      }
      consume.fetch(updateData).then( res => {
        this.setState({
          data: res.logger
        })
      })

    
     
    }
    axiosCall = e =>{
        e.preventDefault();

        const axiosData = {
          method: 'get',
          url: this.state.url + '/1',
  
        }

        axios(axiosData).then( res => {
          console.log(res);
        })
    }
      render() {
        return (
          <div >
            {!this.state.show ? (
              <Logs logs={this.state.data} /> // renders the data.
            ) : null}
            {this.state.data.length > 20 ? null : (
              <span>
                   <button style={{ margin: '0px 5px'}} className="btn btn-outline-danger" onClick={this.postData}> Post Data</button>
                   <button style={{ margin: '0px 5px'}}  className="btn btn-outline-danger" onClick={this.getData}> Get Data</button>
                   <button style={{ margin: '0px 5px'}}  className="btn btn-outline-danger" onClick={this.updateData}> Update Data</button>
                   <button style={{ margin: '0px 5px'}}  className="btn btn-outline-danger" onClick={this.deleteData}> Delete Data</button>
                   <button style={{ margin: '0px 5px'}}  className="btn btn-outline-danger" onClick={this.axiosCall}> Axios Call</button>
              </span>
            )}
          </div>
        );
      }
}
export default Home;
