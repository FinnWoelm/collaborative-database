import React, { Component } from 'react'
import styled from 'styled-components'

const Cell = styled.div`
  display: inline-block;
  padding: 8px;
  display: table-cell;
  border: 1px solid #d2d2d2;
  border-top-width: 0px;

  &:not(:first-of-type) {
    border-left-width: 0px;
  }
`

const Row = styled.div`
  display: table-row;
`

const Table = styled.div`
  display: table;
  margin: auto;
`

const TableHead = styled(Row)`
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

class TableView extends Component {
  constructor() {
    super();
    this.state = { records: [] };
  }

  async componentDidMount() {
    const { table } = this.props
    const records = await table.fetchRecords()
    this.setState({ records: records })
  }

  render() {
    const { records } = this.state

    return (
      <Table>
        <TableHead>
          <Cell>
            ID
          </Cell>
          <Cell>
            Attributes
          </Cell>
          <Cell>
            Timestamp
          </Cell>
        </TableHead>
        {records.map(record => (
          <Row key={record.id}>
            <Cell>
              {record.id}
            </Cell>
            <Cell>
              {record.attributes}
            </Cell>
            <Cell>
              {record.timestamp}
            </Cell>
          </Row>
        ))}
      </Table>
    )
  }
}

export default TableView
