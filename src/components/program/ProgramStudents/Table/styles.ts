import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  margin-bottom: 20px;
  margin-top: 18px;
  font-family: 'Roboto', sans-serif;

  th,
  td {
    border-bottom: 1px solid #ddd;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  th {
    font-weight: 700;
    font-family: 'Roboto-Bold';
    font-style: bold;
    font-size: 14px;
    overflow: auto;
    color: ${(props) => props.theme.primary950};
  }

  td {
    font-weight: 400;
    font-size: 14px;
    color: ${(props) => props.theme.gray900};
    word-wrap: break-word;
    overflow: auto;
    max-width: 0;
  }

  ::-webkit-scrollbar {
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 50px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  /* Scrollbar thumb when active */
  ::-webkit-scrollbar-thumb:active {
    background: rgba(0, 0, 0, 0.7);
  }
`;
