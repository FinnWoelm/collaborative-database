import React from 'react'
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

const data = [{
  id: 'pumkin',
  attributes: 'john',
  timestamp: 'now'
},{
  id: 'pumkin',
  attributes: 'john',
  timestamp: 'now'
},{
  id: 'pumkin',
  attributes: 'john',
  timestamp: 'now'
},{
  id: 'pumkin',
  attributes: 'john',
  timestamp: 'now'
}]

const TableView = () => (
  <div style={{display: 'table', margin: 'auto'}}>
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
    {data.map(record => (
      <Row>
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
  </div>
)

export default TableView
