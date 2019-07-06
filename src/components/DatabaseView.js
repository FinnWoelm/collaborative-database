import React, { Component, Fragment } from 'react'
import { Route, Link, Redirect } from "react-router-dom"

import TableView from './TableView.js';

class DatabaseView extends Component {
  render() {
    const { database, match } = this.props

    // Remove trailing slash
    // See: https://github.com/ReactTraining/react-router/issues/4841#issuecomment-507400321
    const matchURL = match.url.replace(/\/+$/, '')

    return (
      <Fragment>
        <strong>Tables</strong>
        <ul>
          {database.tables.map(table => (
            <li key={table.name}>
              <Link to={`${matchURL}/${table.name}`}>
                {table.name}
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        {database.tables.map(table => (
          <Route exact path={`${matchURL}/${table.name}`} render={() => <TableView table={table} />} />
        ))}
        <Route
          exact
          path={match.url}
          render={() => <Redirect to={`${matchURL}/${database.tables[0].name}`} />} />

      </Fragment>
    )
  }
}

export default DatabaseView
