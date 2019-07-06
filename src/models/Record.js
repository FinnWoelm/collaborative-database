import { types, getParentOfType, getSnapshot } from "mobx-state-tree"

import Table from './Table'

const Record = types
  .model({
    id: types.string,
    attributes: types.string,
    timestamp: types.maybe(types.string)
  })
  .views(self => ({
    // Return the URL for writing the record to the table
    get writeURL() {
      return getParentOfType(self, Table).writeURL(getSnapshot(self))
    }
  }))
  .actions(self => ({
    persist() {
      // TODO: Needs error handling!
      fetch(self.writeURL, { method: 'post' })
        .then(response => console.log(response));

      return true
    }
  }))

export default Record
