class Record {
  id
  attributes
  timestamp

  constructor({ id, attributes, timestamp }) {
    this.id = id
    this.attributes = attributes
    this.timestamp = timestamp
  }
}

export default Record
