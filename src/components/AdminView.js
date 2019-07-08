import React, { Component, Fragment } from 'react'
import { Link, Route } from "react-router-dom"

import SuggestionsPage from './SuggestionsPage'
import DatabaseView from './DatabaseView'
import setupDatabase from '../helpers/setupDatabase'

const getAdminConfig = (adminKey) => {
  return {
    formID: adminKey,
    formFields: {
      table: 'Table',
      id: 'ID',
      attributes: 'Attributes'
    }
  }
}

class AdminView extends Component {
  constructor(props) {
    super(props)


    this.state = { database: setupDatabase(getAdminConfig(this.adminKey())) }
  }

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

  adminKey() {
    return this.props.match.params.key
  }

  suggestionTable() {
    return this.state.database.tables.find(table => table.name === 'suggestions')
  }

  render() {
    // Remove trailing slash
    // See: https://github.com/ReactTraining/react-router/issues/4841#issuecomment-507400321
    const matchURL = this.props.match.url.replace(/\/+$/, '')

    return (
      <Fragment>
        <Link to={`${matchURL}/suggestions`}>
          Review suggestions
        </Link>
        <br/>
        <br/>
        <DatabaseView
          database={this.state.database}
          isAdmin={true}
          adminKey={this.adminKey()}
          createLabel='Create'
          onCreateRecord={this.onCreateRecord}
          editLabel='Edit'
          updateLabel='Update'
          onUpdateRecord={this.onUpdateRecord}
          destroyLabel='Delete'
          onDestroyRecord={this.onDestroyRecord}
          {...this.props} />
        <Route
          path={`${matchURL}/suggestions`}
          render={props => (
            <SuggestionsPage
              database={this.state.database}
              table={this.suggestionTable()} />
          )} />
      </Fragment>
    )
  }
}

export default AdminView
