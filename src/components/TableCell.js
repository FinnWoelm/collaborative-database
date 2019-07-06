import styled from 'styled-components'

const TableCell = styled.div`
  display: inline-block;
  padding: 8px;
  display: table-cell;
  border: 1px solid #d2d2d2;
  border-top-width: 0px;

  &:not(:first-of-type) {
    border-left-width: 0px;
  }
`
export default TableCell
