import { Menu, Dropdown, message, Select, List, Avatar, Button, Drawer, Table } from 'antd';
import { DownOutlined,  MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React from "react";
import axios from 'axios'
import GymTableView from "./Dashboard";

const { Option } = Select

// news
const listData = [];
for (let i = 0; i < 10; i++) {
  listData.push({
    href: 'https://emergency.uncc.edu/coronavirus',
    title: `COVID-19 Info@UNCC`,
    avatar: 'https://static01.nyt.com/newsgraphics/2020/03/10/coronavirus-pathogen/0ee8f1a44b1932072653a0a75ff96486feb6f36d/covid-virus.png',
    description:
      'Official cite for UNCC monitoring COVID-19 enmergency',
    content:
      'UNC Charlotte is dedicated to the health and safety of its campus community. As part of the UNC System, the University works closely with System officials on major decisions affecting classes, leave and payroll.',
  });
}

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

// drawer
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

class SportSelectView extends React.Component{

    state = {

        sport_id: [],
        sport_names: [],
        area_id: [],
        area_names: [],
        equipment_id: [],
        equipment_names: [],
        display_table: false,
        selected_sport_name: "Select a Sport",
        selected_sport_id: null,
        
        // Drawer
        visible: false,
        placement: 'bottom'
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
      this.state.selected_sport_name = object.children;
      this.state.selected_sport_id = key
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
    
    showSrc = () => {
      this.setState({
        visible: true,
      });
    };

    onClose = () => {
      this.setState({
        visible: false,
      });
    };
    
    render() {
        return (
            <div>
                <h3 style = {styles}><b>News</b></h3>
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 1,
                  }}
                  dataSource={listData}
                  renderItem={item => (
                    <List.Item
                      key={item.title}
                      actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                      ]}
                      extra={
                        <img
                          width={272}
                          alt="logo"
                         src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                      />
                      {item.content}
                    </List.Item>
                  )}
                />
                
                <hr/>
                <h3 style = {styles}><b>Gym Info</b></h3>
                <Select
                    showSearch
                    style={{ width: 200, marginBottom: 50 }}
                   // placeholder="Select a Sport"
                    optionFilterProp="children"
                    onSelect={this.onSelect.bind(this)}
                    defaultValue={this.state.selected_sport_name}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.state.sport_names.map(sport => (
                      <Option key={this.state.sport_id[this.state.sport_names.indexOf(sport)]}>{sport}</Option>
                    ))}
                  </Select>
                {this.state.display_table ? <GymTableView data={this.state}/> : <span/>}
                {this.state.display_table ? <Button type = "primary" onClick={this.showSrc}>I'm Felling Lucky!</Button> : <span/>}
                
                <Drawer
                    title="Available Time Slots"
                    placement={this.state.placement}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
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
                            <a style={{ marginRight: 16 }}>Reserve</a>
                            <a>WL</a>
                          </span>
                        )}
                      />
                    </Table>
                </Drawer>
            </div>
        )
    }

}

export default SportSelectView;
