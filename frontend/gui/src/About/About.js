import React from "react";
import { Carousel } from 'antd';
import './About.css'
import Belk from '../images/Belk.jpg'
import NRFC from '../images/NRFC.jpg'
import UREC from '../images/UREC.jpg'

class AboutGym extends React.Component{

    onChange = (a, b, c) => {
        console.log(a, b, c);
    };

    render(){
        return(
            <Carousel afterChange={this.onChange}>
                <div>
                    <h1 className = "title1">Welcome to our Gym Reservation System</h1>
                    <div className = "textbox1">
                        <p>Our system is mainly based on Gyms operated by University of North Carolina at Charlotte(NUCC), including Belk Gym, NRFC and University Recreation Center(UREC).
                            Our Motivation is to help Students check out the availability of Gym Resources and allow them to reserve slots at the Gym online with easy operations.
                            Given the source of the gyms can be a mess, we would like to show several pages of information of these three gyms, and for now we will present a brief introduction on our system, mainly for student users.
                        </p>
                        <p>Our system provide interface for both staff and students.
                            For staff, we do provide interfaces for staff to track the gym source.
                            For students, we do support a convenient gym source navigation by running advanced searching operations by name of sports, such as basketball, badminton, etc., then, the available area, equipments, as well as time slots will be presented for students to do their reservation. Besides, waitlist feature is added for complexity source arrangements.
                            The reservation and waitlist status can be reviewed in profile page later.
                            Besides, some news can also be checked in the system, for students to know the cutting edge affairs.
                            For more information, please contact us!
                        </p>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <div className="textbox">
                            <h1 className = "title">Belk Gym</h1>
                            <ul>
                                <li> Belk Gym offers over 100,000 sq. ft. of space to meet the needs of the UNC Charlotte community for recreation. </li>
                                <li> Completely renovated in 2015, Belk Gym features 3 multipurpose hardwood basketball and volleyball courts, 2 racquetball courts, badminton courts, dedicated locker rooms and a 25 yd. x 25 meter pool. </li>
                                <li> Pretty solid choice for basketball and swimming! </li>
                                <li> location: 8827 Craver Rd. Charlotte, NC 28262 </li>
                                <li> Hours: Mon. - Thur. 7:00 a.m. to 11:00 p.m. Fri. 7:00 a.m. to 8:00 p.m. (Pool: N/A) </li>
                            </ul>
                        </div>
                        <img className = "imgbox" src = {Belk} alt = "Belk Gym"/>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <div className="textbox">
                            <h1 className = "title">NRFC</h1>
                            <ul>
                                <li> Opened in 2011, the Northeast Rec Field Complex, or NRFC, features over 15 acres of synthetic turf fields for soccer, football and softball with lights for night time use. </li>
                                <li> NRFC is home to several intramural sports as well as open recreation opportunities. </li>
                                <li> Equipment is available for check out or you can bring your own! </li>
                                <li> Nice choice for soccer! </li>
                                <li> location: 1001 John Kirk Dr. Charlotte, NC 28262 </li>
                                <li> Hours: Sun. - Thur. 4:00 p.m. to 10:00 p.m. </li>
                            </ul>
                        </div>
                        <img className = "imgbox" src={NRFC} alt="NRFC"/>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <div className = "textbox">
                            <h1 className = "title">UREC</h1>
                            <ul>
                                <li> Indoor and outdoor multipurpose courts and leisure pools featuring a vortex loop, 4 lanes for lap swimming, and zero depth entry </li>
                                <li> Over 30,000 sq. ft. of dedicated space for fitness equipment. </li>
                                <li> Personal training assessment space, elevated track and indoor turf area included! </li>
                                <li> Plenty of lockers. </li>
                                <li> Remember to try the fitness facility and swimming pool! </li>
                                <li> location: 8911 University Rd. Charlotte, NC 28262 </li>
                                <li> Hours: Mon. - Fri. 6:00 a.m. to 12:00 a.m. Sat. 9:00 a.m. to 9:00 p.m. (Pool: 1 hr earlier) </li>
                            </ul>
                        </div>
                        <img className="imgbox" src={UREC} alt="UREC"/>
                    </div>
                </div>
            </Carousel>
        )
    }
}

export default AboutGym;
