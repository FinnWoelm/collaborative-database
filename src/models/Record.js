import { types, getParentOfType, getSnapshot } from "mobx-state-tree"

import Table from './Table'

const Record = types
  .model({
    id: types.string,
    attributes: types.string,
    timestamp: types.maybeNull(types.string)
  })
  .views(self => ({
    // Return the URL for deleting the record from the table
    get deleteURL() {
      return getParentOfType(self, Table).deleteURL(getSnapshot(self))
    },
    // Return the URL for writing the record to the table
    get writeURL() {
      return getParentOfType(self, Table).writeURL(getSnapshot(self))
    }
  }))
  .actions(self => ({
    // Deletes the record
    destroy() {
      // TODO: Needs error handling!
      fetch(self.deleteURL, { method: 'post' })
        .then(response => alert('Record deleted'));

      getParentOfType(self, Table).removeRecord(self)

      return true
    },
    persist() {
      // TODO: Needs error handling!
      fetch(self.writeURL, { method: 'post' })
        .then(response => alert('Record saved'));

      return true
    },
    // Assigns attributes & persists record
    update(attributes) {
      self.attributes = attributes
      self.timestamp = null
      self.persist()
    }
  }))

export default Record
