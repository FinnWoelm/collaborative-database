import React, { Component } from 'react'

import DatabaseView from './DatabaseView'
import setupDatabase from '../helpers/setupDatabase'

const getAdminConfig = (adminKey) => {
  return {
    formID: adminKey,
    formFields: {
      table: 'entry.1190729126',
      id: 'entry.149192443',
      attributes: 'entry.538827119'
    }
  }
}

class AdminView extends Component {
  onCreateRecord = ({ table, recordDraft }) => {
    table.addRecord(recordDraft)

    recordDraft.persist()

    return true
  }

  onUpdateRecord = ({ record, recordDraft }) => {
    record.update(recordDraft.attributes)

    return true
  }

  onDestroyRecord = ({ record }) => {
    record.destroy()

    return true
  }

  render() {
    const adminKey = this.props.match.params.key

    return (
      <DatabaseView
        database={setupDatabase(getAdminConfig(adminKey))}
        isAdmin={true}
        adminKey={adminKey}
        createLabel='Create'
        onCreateRecord={this.onCreateRecord}
        editLabel='Edit'
        updateLabel='Update'
        onUpdateRecord={this.onUpdateRecord}
        destroyLabel='Delete'
        onDestroyRecord={this.onDestroyRecord}
        {...this.props} />
    )
  }
}

export default AdminView
