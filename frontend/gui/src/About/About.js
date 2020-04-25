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
                    <h1 class = "title">Welcome to our Gym Reservation System</h1>
                    <div class = "textbox">
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
                    <h1 class = "title">Belk Gym</h1>
                    <img class = "imgbox" src = {Belk} alt = "Belk Gym"/>
                    <div class ="textbox">
                        <p>
                            Belk Gym offers over 100,000 sq. ft. of space to meet the needs of the UNC Charlotte community for recreation.
                            Completely renovated in 2015, Belk Gym features 3 multipurpose hardwood basketball and volleyball courts, 2 racquetball courts, badminton courts, dedicated locker rooms and a 25 yd. x 25 meter pool.
                            Pretty solid choice for basketball and swimming!
                        </p>
                    </div>
                </div>
                <div>
                    <h1 class="title">NRFC</h1>
                    <img class="imgbox" src={NRFC} alt="NRFC"/>
                    <div class="textbox">
                        <p>
                            Opened in 2011, the Northeast Rec Field Complex, or NRFC, features over 15 acres of synthetic turf fields for soccer, football and softball with lights for night time use.
                            NRFC is home to several intramural sports as well as open recreation opportunities.
                            Equipment is available for check out or you can bring your own!
                            Nice choice for soccer!
                        </p>
                    </div>
                </div>
                <div>
                    <h1 class="title">UREC</h1>
                    <img class="imgbox" src={UREC} alt="UREC"/>
                    <div class="textbox">
                        <p>
                            Indoor and outdoor multipurpose courts and leisure pools featuring a vortex loop, 4 lanes for lap swimming, and zero depth entry
                            Over 30,000 sq. ft. of dedicated space for fitness equipment. Group fitness and multipurpose studios, a personal training assessment space, an elevated track and an indoor turf area included!
                            Plenty of lockers.
                            Newest built one in the University!
                            Remember to try the fitness facility and swimming pool!
                        </p>
                    </div>
                </div>
            </Carousel>
        )
    }
}

export default AboutGym;
