import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from "mobx-react"

import BorderlessTableCell from './BorderlessTableCell'
import TableRow from './TableRow'
import TableCell from './TableCell'

const TableLayout = styled.div`
  display: table;
`

const TableHead = styled(TableRow)`
  background: black;
  color: white;

  div {
    font-weight: bold;
    border-color: black;
    border-top-width: 1px;

    &:not(:last-of-type) {
      border-right-color: white;
    }
  }
`

const SuggestionsPage = observer(
  class SuggestionsPage extends Component {
    componentDidMount() {
      this.props.database.tables.forEach(table => table.fetchRecords())
    }

    acceptSuggestion = (suggestion) => {
      const { id: idToChange, table: tableToChange, changes } = suggestion.attributes

      // apply suggestion
      const table = this.props.database.tables.find(table => table.name === tableToChange)
      // find record or create new one
      let record = table.records.find(record => record.id === idToChange) ||
                   table.createRecord({ id: idToChange })
      // delete or update record
      if(changes === 'delete')
        record.destroy()
      else
        record.update(changes)

      suggestion.update({ accepted: true })
    }

    render() {
      const { table } = this.props
      const suggestions = table.records
      const { columns } = table

      return (
        <TableLayout>
          <TableHead>
            <TableCell>
              ID
            </TableCell>
            {columns.map(column => (
              <TableCell key={column}>
                {column}
              </TableCell>
            ))}
            <TableCell>
              Timestamp
            </TableCell>
          </TableHead>
          {suggestions.map(suggestion => (
            <TableRow key={suggestion.id}>
              <TableCell>
                {suggestion.id}
              </TableCell>
              {columns.map(column => (
                <TableCell key={column}>
                  {JSON.stringify(suggestion.attributes[column])}
                </TableCell>
              ))}
              <TableCell>
                {suggestion.timestamp}
              </TableCell>
              {
                suggestion.attributes['accepted'] ? null : (
                  <BorderlessTableCell>
                    <button onClick={() => this.acceptSuggestion(suggestion)}>
                      Accept Suggestion
                    </button>
                  </BorderlessTableCell>
                )
              }
            </TableRow>
          ))}
        </TableLayout>
      )
    }
  }
)

export default SuggestionsPage
