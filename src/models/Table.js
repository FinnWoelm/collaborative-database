import sheetrock from 'sheetrock'
import { types, getParentOfType } from "mobx-state-tree"

import Record from './Record'
import Database from './Database'

const Table = types
  .model({
    name: types.string,
    googleID: types.string,
    records: types.array(Record)
  })
  .views(self => ({
    get readURL() {
      return `${getParentOfType(self, Database).readURL}#gid=${self.googleID}`
    }
  }))
  .actions(self => ({
    createRecord(attributes) {
      self.records.push(attributes)

      return self.records[self.records.length-1]
    },
    fetchRecords() {
      self.records = []
      self._query('SELECT *').then(
        // when promise resolves invoke the appropiate action
        // (note that there is no need to bind here)
        self.fetchRecordsSuccess,
        self.fetchRecordsError
      )
    },
    fetchRecordsSuccess(records) {
      self.state = "done"
      self.records = records
    },
    fetchRecordsError(error) {
      console.error("Failed to fetch records", error)
      self.state = "error"
    },
    // Return the URL for writing data
    writeURL({ id, attributes }) {
      return getParentOfType(self, Database).writeURL({
        table: self.name,
        id: id,
        attributes: attributes
      })
    },
    // Run a query against the records in this table
    _query(query) {
      return new Promise((resolve, reject) => {
        sheetrock({
          query: query,
          reset: true,
          url: self.readURL,
          callback: (error, options, response) => {
            if (error) {
              reject(error)
            } else {
              const rows = response.rows

              // remove header
              rows.shift()

              // translate into records
              const records = rows.map(row => (
                Record.create({
                  id: row.cellsArray[0],
                  attributes: row.cellsArray[1],
                  timestamp: row.cellsArray[2],
                })
              ))

              // return records
              resolve(records)
            }
          }
        })
      })
    }
  }))

export default Table
