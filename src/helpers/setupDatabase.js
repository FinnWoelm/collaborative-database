import Database from '../models/Database'

const setupDatabase = (config) => {
  const database = Database.create({
    sheetID: '1sLhgLZfHKkCcZ3SbVy-LIh_o1rQg3k62enEAND0hD9Q',
    ...config
  })

  database.createTable({
    name: 'plants',
    googleID: '0',
    columns: ['identifier', 'alt', 'name', 'note']
  })

  database.createTable({
    name: 'relationships',
    googleID: '1567813754',
    columns: ['plant1', 'plant2', 'likes', 'note']
  })

  database.createTable({
    name: 'suggestions',
    googleID: '2121427503',
    columns: ['table', 'id', 'changes', 'accepted']
  })

  return database
}

export default setupDatabase
