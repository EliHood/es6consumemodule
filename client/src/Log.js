import React from 'react';
import moment from 'moment';
const Log = (props) => {
    return (
        <div className=".col-12 .col-md-8  mt-4">
            <div
                className="table-responsive"
                style={{
                maxHeight: '500px',
                overflow: 'auto'
            }}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">startTime</th>
                            <th scope="col">endTime</th>
                            <th scope="col">Date</th>
                            <th scope="col">Url</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Method</th>
                            <th scope="col">Status</th>
                            <th scope="col">ClientId</th>
                            <th scope="col">TransactionID</th>
                        </tr>
                    </thead>
                    {props
                        .logs
                        .map((log, i) => (
                            <tbody key={i}>
                                <tr>
                                    <th scope="row">{log.startTime}</th>
                                    <td>{log.endTime}</td>
                                    <th scope="row">{moment()
                                        
                                        .format("MM/DD/YYYY")}</th>
                                    <td>{log.url}</td>
                                    <td>{log.duration}</td>
                                    <td>{log.method}</td>
                                    <td
                                        style={{
                                        color: log.status === 200 || log.status === 201
                                            ? 'green'
                                            : 'red'
                                    }}>
                                        {log.status}
                                    </td>
                                    <td>
                                        {Math.floor(Math.random() * 52029326) + 1}
                                    </td>
                                    <td>
                                        {Math.floor(Math.random() * 340493046) + 1}
                                    </td>
                                </tr>
                                <tr></tr>
                            </tbody>
                        ))}
                </table>
            </div>
        </div>
    )
}
export default Log;