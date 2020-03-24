import { Table } from 'antd';
import React from "react";


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
      equipment_data: []
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



  render() {
    const { selectedRowKeysArea } = this.state;
    const rowSelectionArea = {
      selectedRowKeysArea,
      onChange: this.onSelectChangeArea,
      hideDefaultSelections: true,

    };

    const { selectedRowKeysEquipment } = this.state;
    const rowSelectionEquipment = {
      selectedRowKeysEquipment,
      onChange: this.onSelectChangeEquipment,
      hideDefaultSelections: true,

    };
    return (
        <div>
          <Table rowSelection={rowSelectionArea} columns={area_columns} dataSource={this.state.area_data}/>
          <Table rowSelection={rowSelectionEquipment} columns={equipment_columns} dataSource={this.state.equipment_data}/>
        </div>



    )
  }
}

export default GymTableView;