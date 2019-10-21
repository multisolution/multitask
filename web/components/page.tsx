import styled from "styled-components";
import {Align} from "./layout";

type Props = {
  horizontal?: Align,
  vertical?: Align,
}

const Page = styled.div<Props>`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.horizontal || Align.Start};
  justify-content: ${props => props.vertical || Align.Start};
`;

export default Page;
