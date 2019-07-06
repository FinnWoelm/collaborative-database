import React, { Component } from 'react'

import BorderlessTableCell from './BorderlessTableCell'
import TableRow from './TableRow'
import TableCell from './TableCell'

class TableEditRecordForm extends Component {
  constructor(props) {
    super(props)

    this.state = { record: props.record }
  }

  setRecordAttribute = ({ target }) => {
    const { name, value } = target
    const { record } = this.props

    record.setAttribute(name, value)
  }

  resetRecord = event => {
    event.preventDefault()

    const { record, afterEditRecord } = this.props

    record.reset()

    afterEditRecord()
  }

  updateRecord = event => {
    event.preventDefault()

    const { record, afterEditRecord } = this.props

    record.persist()

    afterEditRecord()
  }

  render() {
    const { columns, record } = this.props
    const { id, attributes } = record

    return (
      <TableRow as="form" onSubmit={this.updateRecord}>
        <TableCell>
          {id}
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
          <button type='submit'>Update</button>
        </BorderlessTableCell>
        <BorderlessTableCell>
          <button onClick={this.resetRecord}>Cancel</button>
        </BorderlessTableCell>
      </TableRow>
    )
  }
}

export default TableEditRecordForm
