import sheetrock from 'sheetrock'

import Record from './Record'

class Table {
  database
  #googleID
  #records

  constructor({ database, googleID }) {
    this.database = database
    this.#googleID = googleID
  }

  // Return the Google URL for this table
  get googleURL() {
    return `${this.database.URL}#gid=${this.#googleID}`
  }

  // Fetch the table's records. Caches records for performance reasons.
  fetchRecords() {
    return this.#records || (this.#records = this.query('SELECT *'))
  }

  // Run a query against the records in this table
  query(query) {
    return new Promise((resolve, reject) => {
      sheetrock({
        query: query,
        reset: true,
        url: this.googleURL,
        callback: (error, options, response) => {
          if (error) {
            reject(error)
          } else {
            const rows = response.rows

            // remove header
            rows.shift()

            // translate into records
            const records = rows.map(row => this.constructor.initializeRecord(row))

            // return records
            resolve(records)
          }
        }
      })
    })
  }

  // initialize a record from a table row
  static initializeRecord(row) {
    return new Record({
      id: row.cellsArray[0],
      attributes: row.cellsArray[1],
      timestamp: row.cellsArray[2],
    })
  }
}

export default Table
