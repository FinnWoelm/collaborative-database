import React from 'react'

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

const AdminView = props => (
  <DatabaseView
    database={setupDatabase(getAdminConfig(props.match.params.key))}
    isAdmin={true}
    adminKey={props.match.params.key}
    {...props} />
)

export default AdminView
