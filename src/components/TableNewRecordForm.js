import React, { Component } from 'react'

import BorderlessTableCell from './BorderlessTableCell'
import TableRow from './TableRow'
import TableCell from './TableCell'

class TableNewRecordForm extends Component {
  constructor(props) {
    super(props);

    let attributes = {}

    props.table.columns.forEach(column => {
      attributes[column] = ''
    })

    this.state = { id: '', ...attributes };
  }

  handleChange = ({ target }) => {
    const { name, value } = target

    this.setState({
      [name]: value
    });
  }

  saveRecord = event => {
    event.preventDefault()

    const { table } = this.props
    const { id, ...attributes } = this.state

    if(!id)
      return

    const record = table.createRecord({
      id: id,
      attributes: attributes
    })

    record.persist()

    this.clearForm()
  }

  clearForm() {
    let attributes = {}

    this.props.table.columns.forEach(column => {
      attributes[column] = ''
    })

    this.setState({
      id: '',
      ...attributes
    })
  }

  render() {
    const { id } = this.state
    const { columns } = this.props.table

    return (
      <TableRow as="form" onSubmit={this.saveRecord}>
        <TableCell>
          <input name='id' value={id} onChange={this.handleChange} />
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
          <button type='submit'>Submit</button>
        </BorderlessTableCell>
      </TableRow>
    )
  }
}

export default TableNewRecordForm
