import styled from "styled-components";

export const Column = styled.div<{space?: number}>`
  display: flex;
  flex-direction: column;
  
  & > * {
    margin-bottom: ${({space = 8}) => space}px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export enum Align {
  Start = 'flex-start',
  Center = 'center',
  End = 'flex-end',
}
