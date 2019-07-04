class Database {
  #googleID

  constructor({ googleID }) {
    this.#googleID = googleID
  }

  get URL() {
    return `https://docs.google.com/spreadsheets/d/${this.#googleID}`
  }
}

export default Database
