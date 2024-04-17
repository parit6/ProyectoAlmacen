import { ClimbingBoxLoader } from "react-spinners";
import styled from "styled-components";

export function SpinnerLoader() {
  return (
    <Container>
      <ClimbingBoxLoader
        color="#3AA597"
        size={80}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 500;
  background: ${(props) => props.theme.bgtotal};
`;
