import React, { Component } from 'react'

import TableRecordForm from './TableRecordForm'

class TableEditRecordForm extends Component {
  constructor(props) {
    super(props)

    this.state = { recordDraft: props.record.copy() }
  }

  resetRecord = event => {
    event.preventDefault()

    this.props.afterEditRecord()
  }

  updateRecord = event => {
    event.preventDefault()

    const { recordDraft } = this.state
    const { record, onUpdateRecord, afterUpdateRecord } = this.props

    let success = onUpdateRecord({ record, recordDraft })

    if(success)
      afterUpdateRecord()
  }

  render() {
    const { columns, updateLabel } = this.props
    const { recordDraft } = this.state

    return (
      <TableRecordForm
        recordDraft={recordDraft}
        columns={columns}
        submitLabel={updateLabel}
        onSubmit={this.updateRecord}
        onCancel={this.resetRecord}
        />
    )
  }
}

export default TableEditRecordForm
