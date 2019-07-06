import React, { Component } from 'react'

import BorderlessTableCell from './BorderlessTableCell'
import TableRow from './TableRow'
import TableCell from './TableCell'

class TableEditRecordForm extends Component {
  constructor(props) {
    super(props)

    const { attributes } = props.record

    this.state = attributes
  }

  handleChange = ({ target }) => {
    const { name, value } = target

    this.setState({
      [name]: value
    });
  }

  updateRecord = event => {
    event.preventDefault()

    const { record } = this.props

    record.update(this.state)

    this.props.afterUpdateRecord()
  }

  render() {
    const { columns } = this.props
    const { id } = this.props.record

    return (
      <TableRow as="form" onSubmit={this.updateRecord}>
        <TableCell>
          {id}
        </TableCell>
        {columns.map(column => (
          <TableCell>
            <input name={column} value={this.state[column]} onChange={this.handleChange} />
          </TableCell>
        ))}
        <TableCell>
          &mdash;
        </TableCell>
        <BorderlessTableCell>
          <button type='submit'>Update</button>
        </BorderlessTableCell>
      </TableRow>
    )
  }
}

export default TableEditRecordForm
