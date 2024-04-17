import styled from "styled-components";

export function ErrorCard({ mensaje }) {
  return (
    <Container>
      <span>Error... [{mensaje}]</span>
    </Container>
  );
}

const Container = styled.div`
  color: ${(props) => props.theme.text};
`;
