import React from 'react'
import { observer } from "mobx-react"

import TableRecord from './TableRecord'

const TableRecords = observer(({ records, ...otherProps }) => (
    records.map(record => (
      <TableRecord key={record.id} record={record} {...otherProps} />
    ))
  )
)

export default TableRecords
