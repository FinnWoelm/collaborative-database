import React, { Component } from 'react'
import { observer } from "mobx-react"

import BorderlessTableCell from './BorderlessTableCell'
import TableRow from './TableRow'
import TableCell from './TableCell'

const CancelAction = ({ onClick }) => (
  <BorderlessTableCell>
    <button onClick={onClick}>
      Cancel
    </button>
  </BorderlessTableCell>
)

const TableRecordForm = observer(
  class TableRecordForm extends Component {
    setRecordID = ({ target }) => {
      const { recordDraft } = this.props

      recordDraft.setID(target.value)
    }

    setRecordAttribute = ({ target }) => {
      const { name, value } = target
      const { recordDraft } = this.props

      recordDraft.setAttribute(name, value)

      console.log(recordDraft.attributes)
    }

    render() {
      const { recordDraft, columns,
              submitLabel, onSubmit, onCancel } = this.props
      const { id, attributes } = recordDraft

      return (
        <TableRow as="form" onSubmit={onSubmit}>
          <TableCell>
            <input name='id' value={id} onChange={this.setRecordID} disabled={true}/>
          </TableCell>
          {columns.map(column => (
            <TableCell key={column}>
              <input
                name={column}
                // Avoid: "A component is changing an uncontrolled input of type
                // undefined to be controlled. Input elements should not switch
                // from uncontrolled to controlled (or vice versa).
                // See: https://stackoverflow.com/a/50722189/6451879
                value={attributes[column] === undefined ? '' : attributes[column]}
                onChange={this.setRecordAttribute} />
            </TableCell>
          ))}
          <TableCell>
            &mdash;
          </TableCell>
          <BorderlessTableCell>
            <button type='submit'>
              {submitLabel}
            </button>
          </BorderlessTableCell>
          {onCancel ? <CancelAction onClick={onCancel} /> : null}
        </TableRow>
      )
    }
  }
)

export default TableRecordForm
