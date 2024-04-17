import styled from "styled-components";

export function BtnCsv({ bgColor, textColor, icono, funcion }) {
  return (
    <Container
      $textColor={textColor}
      $bgColor={bgColor}
      onClick={funcion}
    >
      <div className="contentIcon">
        <span>{icono}</span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  background: linear-gradient(145deg, #3aa597, #1af5d8);
  color: ${(props) => props.$textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  position: relative;
  cursor: pointer;

  .contentIcon {
    position: absolute;
    top: 25%;
    bottom: 25%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    transition: 0.2s;
    &:hover {
      transform: scale(1.5);
    }
  }
`;
