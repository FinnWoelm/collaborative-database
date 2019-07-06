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
    const { record, afterEditRecord } = this.props

    record.update(recordDraft.attributes)

    afterEditRecord()
  }

  render() {
    const { columns } = this.props
    const { recordDraft } = this.state

    return (
      <TableRecordForm
        recordDraft={recordDraft}
        columns={columns}
        editID={false}
        submitLabel='Update'
        onSubmit={this.updateRecord}
        onCancel={this.resetRecord}
        />
    )
  }
}

export default TableEditRecordForm
