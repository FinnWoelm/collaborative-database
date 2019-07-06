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

      const { table } = this.props
      const { recordDraft } = this.state

      if(!recordDraft.id)
        return

      table.addRecord(recordDraft)

      recordDraft.persist()

      this.clearForm()
    }

    clearForm() {
      const { table } = this.props

      this.setState({
        recordDraft: table.newRecord()
      })
    }

    render() {
      const { columns } = this.props
      const { recordDraft } = this.state

      return (
        <TableRecordForm
          recordDraft={recordDraft}
          columns={columns}
          editID={true}
          submitLabel='Create'
          onSubmit={this.saveRecord}
          />
      )
    }
  }
)

export default TableNewRecordForm
