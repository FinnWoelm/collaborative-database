import React from 'react'

import DatabaseView from './DatabaseView'
import setupDatabase from '../helpers/setupDatabase'

const guestConfig = {
  formID: 'abc',
  formFields: {
    table: 'entry.1190729126',
    id: 'entry.149192443',
    attributes: 'entry.538827119'
  }
}

const GuestView = props => (
  <DatabaseView
    database={setupDatabase(guestConfig)}
    {...props} />
)

export default GuestView
