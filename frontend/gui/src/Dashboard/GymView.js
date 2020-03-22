import { Menu, Dropdown, message, Select} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from "react";
import axios from 'axios'
import GymTableView from "./Dashboard";

const { Option } = Select
class SportSelectView extends React.Component{

    state = {

        sport_id: [],
        sport_names: [],
        area_id: [],
        area_names: [],
        equipment_id: [],
        equipment_names: [],
        display_table: false,
        selected_sport: "Select a Sport"

    }

    getInitialState = () => {

        let selected = localStorage.getItem('selected_sport');
        let temp_area_id = JSON.parse(localStorage.getItem('area_id'));
        let temp_area_names = JSON.parse(localStorage.getItem('area_names'));
        console.log(temp_area_names)
        this.setState({
            selected_sport: selected,
            area_id: temp_area_id,
            area_names: temp_area_names
        })
    }

    componentDidMount() {


        console.log("Mounted SportSelectView")
        axios.get('http://127.0.0.1:8000/sport/getAllSports').then(res => {
            const names = [], id = []
            for(let i=0; i< res.data.Sports.length; i++){
                names.push(res.data.Sports[i].sportName);
                id.push(res.data.Sports[i].sportId);
            }

            this.setState(
                {
                    sport_id: id,
                    sport_names: names,
                }
            );
        })
    }

    onSelect = (key, object) => {

      console.log(object.children);
      this.state.selected_sport = object.children;
      const a_names = [];
      const a_id = [];
      const e_names = [];
      const e_id = [];
      this.setState({
          display_table:false
      })
      message.info(`Click on item ` + key );

      axios.get('http://127.0.0.1:8000/area/getAllAreas?sportId=' + key).then(res => {

          for(let i=0; i< res.data.Area.length; i++){
                a_names.push(res.data.Area[i].areaName);
                a_id.push(res.data.Area[i].areaId);
            }

          this.state.area_id = a_id;
          this.state.area_names = a_names;



      }).then(
          axios.get('http://127.0.0.1:8000/equipment/getAllEquipments?sportId=' + key).then(res => {
          for(let i=0; i< res.data.Equipment.length; i++){
                e_names.push(res.data.Equipment[i].equipmentName);
                e_id.push(res.data.Equipment[i].equipmentId);
            }
            this.state.equipment_id = e_id;
            this.state.equipment_names = e_names;
            this.setState({
                 display_table: true
         })


      }).catch(err => console.log(err)),


      ).catch(err => console.log(err))


    };


    render() {
        return (
            <div>

                <Select
                    showSearch
                    style={{ width: 200, marginBottom: 50 }}
                   // placeholder="Select a Sport"
                    optionFilterProp="children"
                    onSelect={this.onSelect.bind(this)}
                    defaultValue={this.state.selected_sport}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.state.sport_names.map(sport => (
                      <Option key={this.state.sport_id[this.state.sport_names.indexOf(sport)]}>{sport}</Option>
                    ))}
                  </Select>
                {
                    this.state.display_table ?
                    <GymTableView data={this.state}/>
                    :
                    <span/>
                }


            </div>
        )
    }


}

export default SportSelectView;