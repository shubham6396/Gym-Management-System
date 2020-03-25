import { Table, Button, List, Avatar, Typography, Tag, Divider, Form, Descriptions } from 'antd';
import { EditOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import {Link, withRouter} from "react-router-dom";
import React from "react";
import axios from 'axios'
import { Card } from 'antd';


const gridStyle = {
  width: '25%',
  textAlign: 'center',
};


// profile
const profile_data = [
    "first name",
    "last name",
    "student id",
    "username",
    "password",
    "email address",
    "phone number"
];

// reservation
const { Column } = Table;

const data = [
  {
    key: '1',
    sport: 'Baketball',
    area_id: '1',
    area_name: 'court 1',
    equipment: 'Ball',
    date: '03-25-2020',
    start_time: '12:00',
    end_time: '13:00',
  },
  {
    key: '2',
    sport: 'Baketball',
    area_id: '2',
    area_name: 'court 2',
    equipment: 'Ball',
    date: '04-20-2020',
    start_time: '13:00',
    end_time: '13:30',
  },
  {
    key: '3',
    sport: 'Batminton',
    area_id: '3',
    area_name: 'court 6',
    equipment: 'Shuttle',
    date: '03-26-2020',
    start_time: '14:00',
    end_time: '16:00',
  },
];

const descriptionStyles = {
    marginLeft: '1%',
    padding: 10,

}


class UserProfile extends React.Component {

    state = {
        userData: {},
        reservationData: []
    }
    componentDidMount() {

        console.log("Profile Component Mounted")
        const usrId = localStorage.getItem('token');
        console.log(usrId);
        axios.get("http://127.0.0.1:8000/user/getUserInfo?usrId=" + usrId).then(res => {


            this.setState({
                userData: res.data.Data
            })


        }).catch(error => console.log(error));

        axios.get("http://127.0.0.1:8000/reservation/getReservationsForUser?usrId=" + usrId).then(res => {

            console.log(res.data.Reservations)
            this.setState({
                reservationData: res.data.Reservations
            })
            console.log(this.state)

        }).catch(error => console.log(error));


    }

    render() {
        return (

            <div className="site-card-border-less-wrapper">
                <Card title="User Information" bordered={true} style={{ width: 1000, marginBottom: '50px' }}>
                  <Descriptions style = {descriptionStyles} >
                      <Descriptions.Item label="First Name">{this.state.userData.usrFirstName}</Descriptions.Item>
                      <Descriptions.Item label="Last Name">{this.state.userData.usrLastName}</Descriptions.Item>
                      <Descriptions.Item label="Student ID">{this.state.userData.usrId}</Descriptions.Item>
                      <Descriptions.Item label="Username">{this.state.userData.usrLoginName}</Descriptions.Item>
                      <Descriptions.Item label="Email ID">{this.state.userData.usrEmailId}</Descriptions.Item>
                      <Descriptions.Item label="Phone Number">{this.state.userData.usrContact}</Descriptions.Item>
                  </Descriptions>
                </Card>

                
                {/* click <Link to="/register/"><EditOutlined/></Link> to make changes. */}
                <hr/>
                <h3 style = {descriptionStyles}><b>My Reservations</b></h3>
                <Table dataSource={this.state.reservationData}>
                  <Column title="Sport" dataIndex="sportName" key="sportName" />
                  <Column title="Area Name" dataIndex="areaName" key="areaName" />
                  <Column title="Equipment" dataIndex="equipmentName" key="equipmentName" />
                  <Column title="Date" dataIndex="reservationDate" key="reservationDate" />
                  <Column title="Start Time" dataIndex="startTime" key="startTime" />
                  <Column title="End Time" dataIndex="endTime" key="endTime" />
                  <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                      <span>
                        <a style={{ marginRight: 16 }}>Reschedule</a>
                        <a>Cancel Reservation</a>
                      </span>
                    )}
                  />
                </Table>
            </div>
        )
    }
}

export default UserProfile;

