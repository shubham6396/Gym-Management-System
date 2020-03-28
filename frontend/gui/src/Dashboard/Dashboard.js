import {Button, Drawer, Table, message} from 'antd';
import React from "react";
import Column from "antd/es/table/Column";
import axios from 'axios'
import swal from "sweetalert";

const area_columns = [
  {
    title: 'Area',
    dataIndex: 'area',
  },

];

const equipment_columns = [
  {
    title: 'Equipment',
    dataIndex: 'equipment',
  },

];

class GymTableView extends React.Component {

    state = {
      selectedRowKeysArea: [], // Check here to configure the default column
      selectedRowKeysEquipment: [],
      area_data: [],
      equipment_data: [],
      timeSlotData: [],

      //Drawer
      visible: false,
      placement: 'bottom'
    };

    componentDidMount() {

      const temp_area_data = [];
      for(let i=0; i<this.props.data.area_id.length; i++){
          temp_area_data.push({
            key: this.props.data.area_id[i],
            area: this.props.data.area_names[i],
          });
      }


      const temp_equipment_data = [];
      for(let i=0; i<this.props.data.equipment_id.length; i++){
          temp_equipment_data.push({
            key: this.props.data.equipment_id[i],
            equipment: this.props.data.equipment_names[i],
          });
      }

      console.log(temp_area_data);
      console.log(temp_equipment_data);

      this.setState({
          area_data: temp_area_data,
          equipment_data: temp_equipment_data
      });

      console.log("Component GymTableView Mounted");
      // console.log(this.state);

    }

  onSelectChangeArea = selectedRowKeysArea => {
    console.log('Area selectedRowKeys changed: ', selectedRowKeysArea);
    this.setState({ selectedRowKeysArea });
  };

  onSelectChangeEquipment = selectedRowKeysEquipment => {
    console.log('Equipment selectedRowKeys changed: ', selectedRowKeysEquipment);
    this.setState({ selectedRowKeysEquipment });
  };

  showTimeSlots = () => {

      if(this.state.selectedRowKeysArea.length == 1 && this.state.selectedRowKeysEquipment.length == 1){
            const areaId = this.state.selectedRowKeysArea;
          const equipmentId = this.state.selectedRowKeysEquipment;
          let areaName = null;
          let equipmentName = null;

          for (let i = 0; i < this.state.area_data.length; i++) {
              if (this.state.area_data[i].key == areaId) {
                  areaName = this.state.area_data[i].area
              }

          }

          for (let i = 0; i < this.state.equipment_data.length; i++) {
              if (this.state.equipment_data[i].key == equipmentId) {
                  equipmentName = this.state.equipment_data[i].equipment
              }

          }

          axios.get('http://127.0.0.1:8000/timeslot/getAllTimeSlots?areaId=' + areaId + '&equipmentId=' + equipmentId).then(res => {

              const data = [];
              for (let i = 0; i < res.data.TimeSlots.length; i++) {
                  data.push({
                      "key": i + 1,
                      "sport_id": this.props.data.selected_sport_id,
                      "sport": this.props.data.selected_sport_name,
                      "area_id": areaId[0],
                      "area_name": areaName,
                      "equipment_id": equipmentId[0],
                      "equipment": equipmentName,
                      "time_slot_id": res.data.TimeSlots[i].timeSlotId,
                      "start_time": res.data.TimeSlots[i].startTime,
                      "end_time": res.data.TimeSlots[i].endTime,
                  })
              }

              this.setState({
                  timeSlotData: data,
                  visible: true,
              });

          });
      }
      else {
          message.info("Please select One Area and Equipment");
      }

    };

    onClose = () => {
      this.setState({
        visible: false,
      });
    };

  addReservation = (record) => {

     const usrId = localStorage.getItem('token');
     
     swal({
       title: "Are you sure you want to Reserve this slot?",
       icon: "warning",
       buttons: ["No, I'm not Sure", "Yes!"]
     }).then((willDone) => {
       if (willDone) {
           swal(record.area_name+" and "+record.equipment+" has been Reserved for you at "+record.start_time, {icon: "success",}).then(value => {
               axios.get('http://localhost:8000/reservation/addReservation?usrId='+ usrId + '&areaId=' + record.area_id + '&equipmentId=' + record.equipment_id + '&sportId=' + record.sport_id + '&timeSlotId=' + record.time_slot_id).then(res =>{

                        this.setState({
                            visible: false,

                       });

                       }).catch(err=> console.log(err));
                   });
           }
       else{
         swal("Your Reservation at "+record.start_time+ " is Not Done Yet");

       }

     });

  };
    
  render() {
    const { selectedRowKeysArea } = this.state.selectedRowKeysArea;
    const rowSelectionArea = {
      selectedRowKeysArea,
      onChange: this.onSelectChangeArea,
      hideDefaultSelections: true,

    };

    const { selectedRowKeysEquipment } = this.state.selectedRowKeysEquipment;
    const rowSelectionEquipment = {
      selectedRowKeysEquipment,
      onChange: this.onSelectChangeEquipment,
      hideDefaultSelections: true,

    };
    return (
        <div>
          <Table rowSelection={rowSelectionArea} columns={area_columns} dataSource={this.state.area_data}/>
          <Table rowSelection={rowSelectionEquipment} columns={equipment_columns} dataSource={this.state.equipment_data}/>
            <Button type = "primary" onClick={this.showTimeSlots}>Check Time Slots</Button>

                <Drawer
                    title="Available Time Slots"
                    placement={this.state.placement}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Table dataSource={this.state.timeSlotData}>
                      <Column title="Sport" dataIndex="sport" key="sport" />
                      <Column title="Area Name" dataIndex="area_name" key="area_name" />
                      <Column title="Equipment" dataIndex="equipment" key="equipment" />
                      <Column title="Start Time" dataIndex="start_time" key="start_time" />
                      <Column title="End Time" dataIndex="end_time" key="end_time" />
                      <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                          <span>
                            <Button type = "primary" style={{ marginRight: 4}} onClick={() => this.addReservation.bind(this)(record)}>Reserve</Button>
                            <Button type = "primary" style={{ marginRight: 10 }}>WL</Button>
                          </span>
                        )}
                      />
                    </Table>
                </Drawer>
        </div>



    )
  }
}

export default GymTableView;
