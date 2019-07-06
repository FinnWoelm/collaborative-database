import React from 'react'
import { observer } from "mobx-react"

import TableRecord from './TableRecord'

const TableRecords = observer(({ records, columns }) => (
    records.map(record => (
      <TableRecord key={record.id} record={record} columns={columns} />
    ))
  )
)

export default TableRecords
