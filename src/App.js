import React from 'react';
import './App.css';

import Database from './models/Database.js'
import Table from './models/Table.js'
import TableView from './components/TableView.js';

const database = new Database({
  googleID: '1sLhgLZfHKkCcZ3SbVy-LIh_o1rQg3k62enEAND0hD9Q'
})

const table = new Table({
  database: database,
  googleID: '0'
})

function App() {
  return (
    <div className="App">
      <TableView table={table} />
    </div>
  );
}

export default App;
