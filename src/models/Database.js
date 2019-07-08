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
    // Return the proxied URL for writing data to this table
    // Because Google forms does not allow CORS, we must proxy the request
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

      const proxiedFormUrl = buildUrl('https://cors-anywhere.herokuapp.com/', {
        path: formURL
      })

      return proxiedFormUrl
    }
  }))

export default Database
