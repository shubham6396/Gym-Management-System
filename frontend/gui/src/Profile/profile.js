import { Table, Button, List, Avatar, Typography, Tag, Divider, Form, Descriptions } from 'antd';
import { EditOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import {Link, withRouter} from "react-router-dom";
import React from "react";


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

const styles = {
    marginLeft: '1%'
}

class UsrProfile extends React.Component {
    render() {
        return (
            <div>
                <Descriptions style = {styles} title="User Info" layout="vertical">
                  <Descriptions.Item label="FirstName"></Descriptions.Item>
                  <Descriptions.Item label="LastName"></Descriptions.Item>
                  <Descriptions.Item label="Student ID"></Descriptions.Item>
                  <Descriptions.Item label="UserName"></Descriptions.Item>
                  <Descriptions.Item label="Email"></Descriptions.Item>
                  <Descriptions.Item label="PhoneNumber"></Descriptions.Item>
                </Descriptions>
                
                *click <Link to="/register/"><EditOutlined/></Link> to make changes.
                <hr/>
                <h3 style = {styles}><b>Reservation Info</b></h3>
                <Table dataSource={data}>
                  <Column title="Sport" dataIndex="sport" key="sport" />
                  <Column title="Area Id" dataIndex="area_id" key="area_id" />
                  <Column title="Area Name" dataIndex="area_name" key="area_name" />
                  <Column title="Equipment" dataIndex="equipment" key="equipment" />
                  <Column title="Date" dataIndex="date" key="date" />
                  <Column title="Start Time" dataIndex="start_time" key="start_time" />
                  <Column title="End Time" dataIndex="end_time" key="end_time" />
                  <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                      <span>
                        <a style={{ marginRight: 16 }}>Reschedule</a>
                        <a>Delete</a>
                      </span>
                    )}
                  />
                </Table>
            </div>
        )
    }
}

export default UsrProfile;

