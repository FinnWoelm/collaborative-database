import React from 'react';
import './App.css';

import { types } from "mobx-state-tree"

import Database from './models/Database.js'
import Table from './models/Table.js'
import TableView from './components/TableView.js';

const database = Database.create({
  sheetID: '1sLhgLZfHKkCcZ3SbVy-LIh_o1rQg3k62enEAND0hD9Q',
  formID: '1FAIpQLSequGB-EJV9NK7aaxNC88LpBuggHm02uSfX3VsYp_wzuj3AkA',
  formFields: {
    table: 'entry.1190729126',
    id: 'entry.149192443',
    attributes: 'entry.538827119'
  }
})

const table = database.createTable({
  name: 'plants',
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
