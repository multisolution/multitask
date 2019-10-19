import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignIn: React.FunctionComponent = () => {
  return (
    <Container>
      <p>Hello world</p>
    </Container>
  );
};

export default SignIn;