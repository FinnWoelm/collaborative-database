import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from "mobx-react"

import TableRow from './TableRow'
import TableCell from './TableCell'
import TableNewRecordForm from './TableNewRecordForm'
import TableRecords from './TableRecords'

const TableLayout = styled.div`
  display: table;
`

const TableHead = styled(TableRow)`
  background: black;
  color: white;

  div {
    font-weight: bold;
    border-color: black;
    border-top-width: 1px;

    &:not(:last-of-type) {
      border-right-color: white;
    }
  }
`

const TableView = observer(
  class TableView extends Component {
    componentDidMount() {
      this.props.table.fetchRecords()
    }

    render() {
      const { table,
              onCreateRecord, onUpdateRecord, onDestroyRecord,
              createLabel, editLabel, updateLabel, destroyLabel } = this.props
      const { records, columns } = table

      return (
        <TableLayout>
          <TableHead>
            <TableCell>
              ID
            </TableCell>
            {columns.map(column => (
              <TableCell key={column}>
                {column}
              </TableCell>
            ))}
            <TableCell>
              Timestamp
            </TableCell>
          </TableHead>
          <TableRecords
            records={records}
            columns={columns}
            editLabel={editLabel}
            updateLabel={updateLabel}
            onUpdateRecord={onUpdateRecord}
            onDestroyRecord={onDestroyRecord}
            destroyLabel={destroyLabel} />
          <TableNewRecordForm
            table={table}
            columns={columns}
            createLabel={createLabel}
            onCreateRecord={onCreateRecord} />
        </TableLayout>
      )
    }
  }
)

export default TableView
