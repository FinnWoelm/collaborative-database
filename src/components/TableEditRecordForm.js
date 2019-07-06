import React, { Component } from 'react'

import BorderlessTableCell from './BorderlessTableCell'
import TableRow from './TableRow'
import TableCell from './TableCell'

class TableEditRecordForm extends Component {
  constructor(props) {
    super(props)

    const { attributes } = props.record

    this.state = { attributes: attributes }
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
    const { attributes } = this.state

    if(!attributes)
      return

    record.update(attributes)

    this.props.afterUpdateRecord()
  }

  render() {
    const { id } = this.props.record
    const { attributes } = this.state

    return (
      <TableRow as="form" onSubmit={this.updateRecord}>
        <TableCell>
          {id}
        </TableCell>
        <TableCell>
          <input name='attributes' value={attributes} onChange={this.handleChange} />
        </TableCell>
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
