import React from "react";
import { Card, Col, Row } from 'antd';
import mihir from '../images/mihir.jpg'
import shubham from '../images/Shubham.jpg'
import kewei from '../images/kewei.jpg'
class ContactGym extends React.Component{

    onChange = (a, b, c) => {
        console.log(a, b, c);
    };
     render(){
        return(

          <div className="site-card-wrapper">
              <div style={{}}>
                <h1><b>
                <center>
                    <font size="7">
                    Our teams are here to help.
                    </font>
                </center>
                </b></h1>
            </div>
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Techinal Support " bordered={true} style={{alignContent:"center"}}>
           <img
                        width={150}
                        alt="logo"
                        src={mihir}
                        style={{ "border-radius": "50%",  alignSelf:"center"}}
                        class="center"

                        />
            <br/>
            <b>Mihir Vadeyar</b>
            <br/>
            Already using our site and experiencing techinal issues?
            Email me at mvadeyar@uncc.edu to contact me or call me on 980-3197709
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Frontdesk" bordered={true}>
              <img
                        width={150}
                        alt="logo"
                        src={kewei}
                        style={{ "border-radius": "50%",  alignSelf:"center"}}
                        class="center"

                        />
            <br/>
            <b>Kewei Yan</b>
            <br/>

            Have a question about gym facilites or need a tour of the gym?
            Email me at keweiyan@uncc.edu to contact me or call me on 860-7718970
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Manager" bordered={true}>

            <img
                        width={150}
                        alt="logo"
                        src={shubham}
                        style={{ "border-radius": "50%",  alignSelf:"center"}}
                        class="center"

                        />
            <br/>
            <b>Shubham Gandhi</b>
            <br/>
            Have any complaints/suggestions about our gym?
            Email me at sgandh@uncc.edu to contact me or call me on 980-3192555
        </Card>
      </Col>
    </Row>
              <div>
                  <br/>
                  <br/>
                  <br/>
                   <font size="6">
                       <b>Location & Hours</b>
                   </font>
                  <br/>
                   <br/>
                   <font size="4">
                       <b>Belk Gym:8am-9pm</b>
                   </font>
                  <br/>
                   <br/>
                   <font size="4">
                  <b>NRFC:3pm-9pm</b>
                   </font>
                  <br/>
                   <br/>
                   <font size="4">
                  <b>UREC:6am-11pm</b>
                   </font>
                  <br/>
                   <br/>
                   <font size="4">
                  <b>8911 University Rd. Charlotte, NC 28262</b>
                   </font>
                  <br/>
                   <br/>
              </div>
  </div>
        )
    }
}
export default ContactGym;