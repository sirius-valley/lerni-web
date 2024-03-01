import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Roboto', sans-serif;

  th {
    font-weight: 700;
    font-family: 'Roboto-Bold';
    font-style: bold;
    font-size: 14px;
    overflow: auto;
    border-bottom: none;
    text-align: center;
    color: ${(props) => props.theme.primary950};
  }

  td {
    font-weight: 400;
    font-size: 14px;
    color: ${(props) => props.theme.gray900};
    word-wrap: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    max-width: 0;
  }

  tr {
    &:last-child {
      border-bottom: none !important;
    }
  }
`;
