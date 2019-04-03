import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import checkboxHOC from "react-table/lib/hoc/selectTable";
import { Button, Dropdown, Checkbox, Icon, Menu } from 'antd'

const CheckboxTable = checkboxHOC(ReactTable);
const ButtonGroop = Button.Group;

export default class Mytable extends Component {
  componentDidMount(){
    
  }

  render(){
    return(
      <div />
    )
  }
}