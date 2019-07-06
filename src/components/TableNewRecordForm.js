import React, { Component } from 'react'
import { observer } from "mobx-react"

import BorderlessTableCell from './BorderlessTableCell'
import TableRow from './TableRow'
import TableCell from './TableCell'

const TableNewRecordForm = observer(
  class TableNewRecordForm extends Component {
    constructor(props) {
      super(props)

      this.state = { record: props.table.newRecord() }
    }

    setRecordID = ({ target }) => {
      const { record } = this.state

      record.setID(target.value)
    }

    setRecordAttribute = ({ target }) => {
      const { name, value } = target
      const { record } = this.state

      record.setAttribute(name, value)
    }

    saveRecord = event => {
      event.preventDefault()

      const { table } = this.props
      const { record } = this.state

      console.log('hello')

      if(!record.id)
        return

      table.addRecord(record)

      record.persist()

      this.clearForm()
    }

    clearForm() {
      const { table } = this.props

      this.setState({
        record: table.newRecord()
      })
    }

    render() {
      const { record } = this.state
      const { id, attributes } = record
      const { columns } = this.props.table

      return (
        <TableRow as="form" onSubmit={this.saveRecord}>
          <TableCell>
            <input name='id' value={id} onChange={this.setRecordID} />
          </TableCell>
          {columns.map(column => (
            <TableCell key={column}>
              <input name={column} value={attributes[column]} onChange={this.setRecordAttribute} />
            </TableCell>
          ))}
          <TableCell>
            &mdash;
          </TableCell>
          <BorderlessTableCell>
            <button type='submit'>Submit</button>
          </BorderlessTableCell>
        </TableRow>
      )
    }
  }
)

export default TableNewRecordForm
