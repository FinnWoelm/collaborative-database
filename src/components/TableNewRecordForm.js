import React, { Component } from 'react'
import { observer } from "mobx-react"

import TableRecordForm from './TableRecordForm'

const TableNewRecordForm = observer(
  class TableNewRecordForm extends Component {
    constructor(props) {
      super(props)

      this.state = { recordDraft: props.table.newRecord() }
    }

    saveRecord = event => {
      event.preventDefault()

      const { table, onCreateRecord } = this.props
      const { recordDraft } = this.state

      let success = onCreateRecord({ table, recordDraft })

      if(success)
        this.clearForm()
    }

    clearForm() {
      const { table } = this.props

      this.setState({
        recordDraft: table.newRecord()
      })
    }

    render() {
      const { columns, createLabel } = this.props
      const { recordDraft } = this.state

      return (
        <TableRecordForm
          recordDraft={recordDraft}
          columns={columns}
          submitLabel={createLabel}
          onSubmit={this.saveRecord}
          />
      )
    }
  }
)

export default TableNewRecordForm
