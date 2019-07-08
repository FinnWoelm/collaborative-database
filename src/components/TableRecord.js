import React, { Component } from 'react'
import { observer } from "mobx-react"

import BorderlessTableCell from './BorderlessTableCell'
import TableEditRecordForm from './TableEditRecordForm'
import TableRow from './TableRow'
import TableCell from './TableCell'

const TableRecord = observer(
  class TableRecord extends Component {
    constructor(props) {
      super(props);
      this.state = { editMode: false };
    }

    enterEditMode = () => {
      this.setState({ editMode: true })
    }

    exitEditMode = () => {
      this.setState({ editMode: false })
    }

    destroyRecord = () => {
      const { record, onDestroyRecord } = this.props

      onDestroyRecord({ ...{ record } })
    }

    editMode() {
      return this.state.editMode
    }

    render() {
      const { record, columns,
              onUpdateRecord,
              editLabel, updateLabel, destroyLabel} = this.props
      const { id, attributes, timestamp } = record

      if(this.editMode())
        return <TableEditRecordForm
                  record={record}
                  columns={columns}
                  updateLabel={updateLabel}
                  onUpdateRecord={onUpdateRecord}
                  afterUpdateRecord={this.exitEditMode} />

      return (
        <TableRow>
          <TableCell>
            {id}
          </TableCell>
          {columns.map(column => (
            <TableCell key={column}>
              {attributes[column]}
            </TableCell>
          ))}
          <TableCell>
            {timestamp}
          </TableCell>
          <BorderlessTableCell>
            <button onClick={this.enterEditMode}>
              {editLabel}
            </button>
          </BorderlessTableCell>
          <BorderlessTableCell>
            <button onClick={this.destroyRecord}>
              {destroyLabel}
            </button>
          </BorderlessTableCell>
        </TableRow>
      )
    }
  }
)

export default TableRecord
