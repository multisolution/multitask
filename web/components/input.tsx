import styled from "styled-components";

const Input = styled.input`
  border-radius: ${props => props.theme.borderRadius};
  min-height: 48px;
  border: none;
  padding: 8px;
  outline: none;
`;

export default Input;