import React, { Component } from 'react'

import DatabaseView from './DatabaseView'
import setupDatabase from '../helpers/setupDatabase'

const guestConfig = {
  formID: '1FAIpQLSdJKkW3lTD-jJimmJOWBSMZdHBJCVrzugnWMhgzpfyx1vBS0w',
  formFields: {
    table: 'entry.1190729126',
    id: 'entry.149192443',
    attributes: 'entry.538827119'
  }
}

class GuestView extends Component {
  constructor(props) {
    super(props)

    this.state = { database: setupDatabase(guestConfig) }
  }

  suggestionTable() {
    return this.state.database.tables.find(table => table.name === 'suggestions')
  }

  onCreateRecord = ({ table, recordDraft }) => {
    const suggestion = this.suggestionTable().newRecord()

    this.suggestionTable().addRecord(suggestion)

    suggestion.update({
      table: table.name,
      id: recordDraft.id,
      changes: recordDraft.attributes
    })

    return true
  }

  onUpdateRecord = ({ record, recordDraft }) => {
    const suggestion = this.suggestionTable().newRecord()

    this.suggestionTable().addRecord(suggestion)

    suggestion.update({
      table: record.table.name,
      id: record.id,
      changes: recordDraft.attributes
    })

    return true
  }

  onDestroyRecord = ({ record }) => {
    const suggestion = this.suggestionTable().newRecord()

    this.suggestionTable().addRecord(suggestion)

    suggestion.update({
      table: record.table.name,
      id: record.id,
      changes: 'delete'
    })

    return true
  }

  render() {
    return (
      <DatabaseView
         database={this.state.database}
         createLabel='Suggest Creation'
         onCreateRecord={this.onCreateRecord}
         editLabel='Suggest Edit'
         updateLabel='Suggest Update'
         onUpdateRecord={this.onUpdateRecord}
         destroyLabel='Suggest Deletion'
         onDestroyRecord={this.onDestroyRecord}
         {...this.props} />
     )
  }
}

export default GuestView
