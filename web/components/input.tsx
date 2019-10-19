import styled from "styled-components";

const Input = styled.input`
  border-radius: ${props => props.theme.borderRadius};
  min-height: 48px;
  border: none;
  padding: 8px;
  outline: none;
  box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.04);
`;

export default Input;