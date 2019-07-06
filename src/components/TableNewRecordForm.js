import React, { Component } from 'react'

import BorderlessTableCell from './BorderlessTableCell'
import TableRow from './TableRow'
import TableCell from './TableCell'

class TableNewRecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = { id: '', attributes: '' };
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
    const { id, attributes } = this.state

    if(!(id && attributes))
      return

    const record = table.createRecord({
      id: id,
      attributes: attributes
    })

    record.persist()

    this.clearForm()
  }

  clearForm() {
    this.setState({
      id: '',
      attributes: ''
    })
  }

  render() {
    const { id, attributes } = this.state

    return (
      <TableRow as="form" onSubmit={this.saveRecord}>
        <TableCell>
          <input name='id' value={id} onChange={this.handleChange} />
        </TableCell>
        <TableCell>
          <input name='attributes' value={attributes} onChange={this.handleChange} />
        </TableCell>
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
