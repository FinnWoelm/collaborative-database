import sheetrock from 'sheetrock'
import { types, getParentOfType, destroy } from "mobx-state-tree"

import generateUUID from '../helpers/generateUUID'
import Record from './Record'
import Database from './Database'

const Table = types
  .model({
    name: types.string,
    googleID: types.string,
    records: types.array(Record),
    columns: types.array(types.string)
  })
  .views(self => ({
    get readURL() {
      return `${getParentOfType(self, Database).readURL}#gid=${self.googleID}`
    }
  }))
  .actions(self => ({
    // adds a record
    addRecord(record) {
      self.records.push(record)
    },
    createRecord(attributes) {
      self.records.push(attributes)

      return self.records[self.records.length-1]
    },
    // Return the URL for deleting data
    deleteURL({ id }) {
      return getParentOfType(self, Database).writeURL({
        table: self.name,
        id: id,
        attributes: 'delete'
      })
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
    // instantiate a new record (but do not persist)
    newRecord() {
      let attributes = {}

      self.columns.forEach(column => {
        attributes[column] = ''
      })

      return Record.create({
        id: generateUUID(),
        attributes: attributes
      })
    },
    // remove a record
    removeRecord(record) {
      destroy(record)
    },
    // Return the URL for writing data
    writeURL({ id, attributeString }) {
      return getParentOfType(self, Database).writeURL({
        table: self.name,
        id: id,
        attributes: attributeString
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
                  attributes: JSON.parse(row.cellsArray[1]),
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
