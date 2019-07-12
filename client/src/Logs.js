import React from 'react';
import Log from './Log';

const Logs = (props) => (
    <div className="main">
        <Log logs={props.logs}/>
    </div>
)

export default Logs;