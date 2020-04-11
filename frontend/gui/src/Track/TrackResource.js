import React from "react";
import { Table, Tag } from 'antd';
import axios from "axios";

const columns = [
  {
    title: 'Sport',
    dataIndex: 'sportName',
    key: 'sportId',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Area',
    dataIndex: 'areaName',
    key: 'areaId',
  },
  {
    title: 'Equipment',
    dataIndex: 'equipmentName',
    key: 'equipmentId',
  },
  {
    title: 'Username',
    key: 'usrId',
    dataIndex: 'usrLoginName',
  },

  {
    title: 'Start Time',
    dataIndex: 'startTime',
    key: 'startTime',
  },

  {
    title: 'End Time',
    dataIndex: 'endTime',
    key: 'endTime',
  },

];



class TrackResource extends React.Component{

    state = {
        data: []
    };

    componentDidMount() {

        console.log("TrackResource Component Mounted")

        axios.get("http://127.0.0.1:8000/reservation/getAllReservations").then(res => {

            console.log(res);
            this.setState({
                data: res.data.Reservations
            });

            console.log(this.state);

        }).catch(error => console.log(error));


    }


    render() {
        return(
            <Table columns={columns} dataSource={this.state.data} />
        )
    }
}

export default TrackResource;