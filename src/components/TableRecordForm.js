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
              editID, submitLabel, onSubmit, onCancel } = this.props
      const { id, attributes } = recordDraft

      return (
        <TableRow as="form" onSubmit={onSubmit}>
          <TableCell>
          {
            editID ? (
              <input name='id' value={id} onChange={this.setRecordID} />
            ) : (
              <span>{id}</span>
            )
          }

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
