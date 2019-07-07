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
  onCreateRecord = ({ table, recordDraft }) => {
    alert('suggest creation: not yet implemented')

    return true
  }

  onUpdateRecord = ({ record, recordDraft }) => {
    alert('suggest update: not yet implemented')

    return true
  }

  onDestroyRecord = ({ record }) => {
    alert('suggest deletion: not yet implemented')

    return true
  }

  render() {
    return (
      <DatabaseView
         database={setupDatabase(guestConfig)}
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
