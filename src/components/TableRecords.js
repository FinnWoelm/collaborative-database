import React from 'react'
import { observer } from "mobx-react"

import TableRow from './TableRow'
import TableCell from './TableCell'

const TableRecords = observer(({ records }) => (
    records.map(record => (
      <TableRow key={record.id}>
        <TableCell>
          {record.id}
        </TableCell>
        <TableCell>
          {record.attributes}
        </TableCell>
        <TableCell>
          {record.timestamp}
        </TableCell>
      </TableRow>
    ))
  )
)

export default TableRecords
