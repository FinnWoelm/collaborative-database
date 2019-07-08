import buildUrl from 'build-url'
import { types } from "mobx-state-tree"

import Table from './Table'

const Database = types
  .model({
    sheetID: types.string,
    formID: types.string,
    formFields: types.frozen(),
    tables: types.array(Table)
  })
  .views(self => ({
    get readURL() {
      return `https://docs.google.com/spreadsheets/d/${self.sheetID}`
    }
  }))
  .actions(self => ({
    createTable(attributes) {
      self.tables.push(attributes)

      return self.tables[self.tables.length-1]
    },
    // Return the URL for writing data to this table
    writeURL({ table, id, attributes }) {
      const formURL = buildUrl('https://script.google.com/', {
        path: `macros/s/AKfycbypjmWHNvoID5K5tyodKMzbagGSA3UzHPArgvtJrcpx-LsmVaw/exec`,
        queryParams: {
          [self.formFields.table]: table,
          [self.formFields.id]: id,
          [self.formFields.attributes]: attributes,
          'adminKey': self.formID
        }
      })

      return formURL
    }
  }))

export default Database
