import React from 'react'
import { observer } from "mobx-react"

import TableRecord from './TableRecord'

const TableRecords = observer(({ records }) => (
    records.map(record => (
      <TableRecord key={record.id} record={record} />
    ))
  )
)

export default TableRecords
