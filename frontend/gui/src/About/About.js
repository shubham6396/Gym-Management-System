import React from "react";
import { Carousel } from 'antd';
import './About.css'



class AboutGym extends React.Component{

    onChange = (a, b, c) => {
        console.log(a, b, c);
    };

    render(){
        return(
            <Carousel afterChange={this.onChange}>
                <div>
                    <h1><b>Welcome to our Gym Reservation System</b></h1>
                    <h3>Our Motive is to help Students check out the availability of Gym Resources and allow them to
                        reserve slots at the Gym online with ease, using this Portal</h3>
                </div>
                <div>
                  <h3>2</h3>
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
            </Carousel>
        )
    }
}

export default AboutGym;
