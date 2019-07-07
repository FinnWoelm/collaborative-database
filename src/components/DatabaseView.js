import React, { Component, Fragment } from 'react'
import { Route, Link, Redirect } from "react-router-dom"

import TableView from './TableView.js';

class DatabaseView extends Component {
  render() {
    const { database, match, ...otherProps } = this.props

    // Remove trailing slash
    // See: https://github.com/ReactTraining/react-router/issues/4841#issuecomment-507400321
    const matchURL = match.url.replace(/\/+$/, '')

    const tables = database.tables.filter(table => table.name !== 'suggestions')

    return (
      <Fragment>
        <strong>Tables</strong>
        <ul>
          {tables.map(table => (
            <li key={table.name}>
              <Link to={`${matchURL}/${table.name}`}>
                {table.name}
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        {tables.map(table => (
          <Route
            key={table.name}
            exact
            path={`${matchURL}/${table.name}`}
            render={() => (
              <TableView
                table={table}
                {...otherProps} />
          )} />
        ))}
        <Route
          exact
          path={match.url}
          render={() => <Redirect to={`${matchURL}/${tables[0].name}`} />} />

      </Fragment>
    )
  }
}

export default DatabaseView
