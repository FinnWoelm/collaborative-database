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

    editMode() {
      return this.state.editMode
    }

    render() {
      const { record } = this.props
      const { id, attributes, timestamp } = record

      if(this.editMode())
        return <TableEditRecordForm record={record} afterUpdateRecord={this.exitEditMode} />

      return (
        <TableRow>
          <TableCell>
            {id}
          </TableCell>
          <TableCell>
            {attributes}
          </TableCell>
          <TableCell>
            {timestamp}
          </TableCell>
          <BorderlessTableCell>
            <button onClick={this.enterEditMode}>Edit</button>
          </BorderlessTableCell>
          <BorderlessTableCell>
            <button onClick={record.destroy}>Delete</button>
          </BorderlessTableCell>
        </TableRow>
      )
    }
  }
)

export default TableRecord
