import styled from "styled-components";
import {darken} from "polished";

type Props = {
  skin: string
}

const Button = styled.button<Props>`
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.colors[props.skin]};
  min-height: 48px;
  cursor: pointer;
  color: white;
  
  &:hover {
    background-color: ${props => darken(0.1, props.theme.colors[props.skin])}
  }
`;

export default Button;