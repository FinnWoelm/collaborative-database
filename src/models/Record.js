import { types, getParentOfType, getSnapshot } from "mobx-state-tree"

import Table from './Table'

const Record = types
  .model({
    id: types.frozen(types.string),
    attributes: types.frozen(),
    timestamp: types.maybeNull(types.string)
  })
  .views(self => ({
    // Return the URL for deleting the record from the table
    get deleteURL() {
      return getParentOfType(self, Table).deleteURL(self)
    },
    // Return the URL for writing the record to the table
    get writeURL() {
      console.log(getSnapshot(self))

      return getParentOfType(self, Table).writeURL(self)
    },
    // JSON-string of attributes for writing to database
    get attributeString() {
      console.log(JSON.stringify(self.attributes))
      return JSON.stringify(self.attributes)
    }
  }))
  .actions(self => ({
    // Return a copy of the record
    copy() {
      return Record.create(getSnapshot(self))
    },
    // Delete the record
    destroy() {
      // TODO: Needs error handling!
      fetch(self.deleteURL, { method: 'post' })
        .then(response => alert('Record deleted'));

      getParentOfType(self, Table).removeRecord(self)

      return true
    },
    // Persist record with current attributes
    persist() {
      // TODO: Needs error handling!
      fetch(self.writeURL, { method: 'post' })
        .then(response => alert('Record saved'));

      self.timestamp = null

      return true
    },
    // Assigns attributes & persists record
    update(attributes) {
      console.log(attributes)

      self.attributes = attributes
      self.persist()
    },
    // Set ID
    setID(id) {
      self.id = id
    },
    // Set attribute
    setAttribute(name, value) {
      self.attributes = Object.assign({}, self.attributes, { [name]: value })
    },
  }))

export default Record
