import { Table, Button, List, Avatar, Typography, Tag, Divider, Form, Descriptions } from 'antd';
import { EditOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import {Link, withRouter} from "react-router-dom";
import React from "react";
import axios from 'axios'
import { Card } from 'antd';
import swal from "sweetalert";
import * as actionTypes from "../User/store/Actions/ActionTypes";


const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

// reservation
const { Column } = Table;

const descriptionStyles = {
    marginLeft: '1%',
    padding: 10,

};

class UserProfile extends React.Component {

    state = {
        userData: {},
        reservationData: [],
        cancelledReservationId: null,
        WLData: []
    };

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

        if (localStorage.getItem('is_WL')== 1) {
            let wl = [{
            sportName: null,
            areaName: null,
            equipmentName: null,
            reservationDate: null,
            startTime: null,
            endTime: null,

            area_id: null,
            equipment_id: null,
            sport_id: null,
            time_slot_id: null
            }];

            wl[0].sportName = localStorage.getItem('sportName');
            wl[0].areaName = localStorage.getItem('areaName');
            wl[0].equipmentName = localStorage.getItem('equipmentName');
            wl[0].reservationDate = localStorage.getItem('reservationDate');
            wl[0].startTime = localStorage.getItem('startTime');
            wl[0].endTime = localStorage.getItem('endTime');

            wl[0].area_id = localStorage.getItem('areaId');
            wl[0].equipment_id = localStorage.getItem('equipmentId');
            wl[0].sport_id = localStorage.getItem('sportId');
            wl[0].time_slot_id = localStorage.getItem('timeSlotId');

            this.setState({WLData: wl});

        } else {
            let wl = [];
        }

    }

    cancelReservation = record => {

        const reservationId = record.reservationId;
        const usrId = this.state.userData.usrId;

        swal({
          title: "Are you sure you want to Cancel this Reservation?",
          icon: "warning",
          dangerMode: true,
          buttons: [ "No, I'm not Sure", "Yes, Cancel it"]
        })
        .then((willDelete) => {
          if (willDelete) {
              swal("Your Reservation at "+record.startTime+" has been Cancelled", {
              icon: "success",
            }).then(value => {

                axios.get("http://127.0.0.1:8000/reservation/cancelReservation?reservationId=" + reservationId).then(res1=> {

                    axios.get("http://127.0.0.1:8000/reservation/getReservationsForUser?usrId=" + usrId).then(res2 => {

                        console.log(res2.data.Reservations);
                        this.setState({
                            reservationData: res2.data.Reservations,
                            cancelledReservationId: res1.data.reservationId
                        });
                        console.log(this.state)

                    }).catch(error => console.log(error));
                    console.log(this.state);

                }).catch(err=> console.log(err))

              });


          } else {
            swal("Your Reservation at "+record.startTime+ " is Intact");
            console.log(window.location.pathname);
          }

        });

    };

    cancelWL = record => {
        swal({
          title: "Are you sure you want to Cancel this WL?",
          icon: "warning",
          dangerMode: true,
          buttons: [ "No, I'm not Sure", "Yes, Cancel it"]
        })
        .then((willDelete) => {
          if (willDelete) {
              swal("Your WL at "+record.startTime+" has been Cancelled", {
              icon: "success",
            }).then(value => {
                localStorage.setItem('is_WL', 0);

                this.setState({WLData: null});

                console.log(record);
            });

          } else {
              swal("Your Reservation at "+record.startTime+ " is Intact");
          }

        });

    };

    addR = record => {
        const usrId = localStorage.getItem('token');

        swal({
            title: "Are you sure you want to Reserve this slot?",
            icon: "warning",
            buttons: ["No, I'm not Sure", "Yes!"]
        }).then((willDone) => {
            if (willDone) {
                swal(record.areaName + " and " + record.equipmentName + " has been Reserved for you at " + record.startTime + "! Please reload the page to see any details", {icon: "success",}).then(value => {
                    axios.get('http://localhost:8000/reservation/addReservation?usrId=' + usrId + '&areaId=' + record.area_id + '&equipmentId=' + record.equipment_id + '&sportId=' + record.sport_id + '&timeSlotId=' + record.time_slot_id).then(res => {

                        this.setState({
                            visible: false,
                        });
                        localStorage.setItem('is_WL', 0);
                        this.setState({WLData: null});
                        window.location.reload(false);

                    }).catch(err => console.log(err));
                });

            } else {
                swal("Your Reservation at " + record.start_time + " is Not Done Yet");
            }

        });

    }

    render() {
        let myNotes;

        if (this.state.is_WL_available) {
            myNotes = <span>Your WaitList is now available, please check the table on the button of this page to add it to Reservation or Cancel it!</span>;
        } else {
            myNotes = <span>Your WaitList is now unavailable</span>;
        }

        return (
            <div className="site-card-border-less-wrapper">
                <h4><b>Notifications: </b>{myNotes}</h4>

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
                <h4 style = {descriptionStyles}><b>My Reservations</b></h4>
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
                        <Button type = "primary" style={{ marginRight: 4}} onClick={() => this.cancelReservation.bind(this)(record)}>Cancel Reservation</Button>
                      </span>
                    )}
                  />
                </Table>
                <hr/>
                <h4 style = {descriptionStyles}><b>My WaitLists</b></h4>
                <Table dataSource={this.state.WLData}>
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
                        <Button type = "primary" style={{ marginRight: 4}} onClick={() => this.addR.bind(this)(record)}>Reserve</Button>
                        <Button type = "primary" style={{ marginRight: 4}} onClick={() => this.cancelWL.bind(this)(record)}>Cancel</Button>
                      </span>
                    )}
                  />
                </Table>
            </div>
        )
    }
}

export default UserProfile;

