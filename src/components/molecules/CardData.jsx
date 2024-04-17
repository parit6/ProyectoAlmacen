import styled from "styled-components";

export function CardData({ title, numserie }) {
  return (
    <Container>
      <div className="card">
        <div className="data-block-content">
          <p className="name">{title}</p>
          <div className="serial-block">
            <p className="serial-value">{numserie}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .card {
    width: auto;
    background: ${(props) => props.theme.bgcards};
    padding: 1rem;
    border-radius: 1rem;
    border: 0.5vmin solid #000000;
    overflow: hidden;
    .name {
      color: ${(props) => props.theme.text};
    }
  }
`;
